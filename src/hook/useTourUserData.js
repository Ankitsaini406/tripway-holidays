import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { database } from "@/firebase/firebaseConfig";
import { jwtDecode } from 'jwt-decode';
import { ref, query, orderByChild, equalTo, get } from "firebase/database";

const useTourUserData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userData, setUserData] = useState(null);

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = getCookie("token"); // Retrieve the token from cookies
            if (!token) {
                console.error("Token not found.");
                setError("User is not authenticated.");
                return;
            }

            try {
                const parsedToken = jwtDecode(token); // Parse the JSON token
                const email = parsedToken.email; // Extract email from the token

                setLoading(true);
                setError(null);

                const usersRef = ref(database, "users"); // Adjust path if needed
                const userQuery = query(usersRef, orderByChild("email"), equalTo(email));
                const snapshot = await get(userQuery);

                if (snapshot.exists()) {
                    const user = snapshot.val();
                    const userKey = Object.keys(user)[0]; // If multiple users, pick the first key
                    setUserData(user[userKey]);
                } else {
                    throw new Error("No user found with the provided email.");
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const addTourData = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!userData) {
            console.error("User data is missing.");
            setError("User data is not available. Fetch user data first.");
            setLoading(false);
            return;
        }

        try {
            const addUserTour = {
                tourName: data.tourName,
                price: data.price,
                userName: data.userName,
                userEmail: data.userEmail,
                userPhoneNumber: data.userPhoneNumber,
                tourDate: data.tourDate,
                userFrom: data.userFrom,
                passenger: data.passenger,
                userId: userData.uid,
                tourId: data.id,
                isPast: data.isPast,
            };

            const response = await fetch(`${apiPoint}/api/group-tours/add-tour`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addUserTour),
            });

            if (response.ok) {
                setSuccess("Your tour booking was successful!");
            } else {
                throw new Error("Failed to add details.");
            }
        } catch (err) {
            setError(err.message);
            console.error("Error adding tour data:", err);
        } finally {
            setLoading(false);
        }
    };

    return { addTourData, loading, error, success, userData };
};

export default useTourUserData;
