import { useState } from "react";
import { getCookie } from "cookies-next";
import { database } from "@/firebase/firebaseConfig";
import { jwtDecode } from "jwt-decode";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";
import { useRouter } from "next/navigation";

const useTourUserData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    const addTourData = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const token = getCookie("token"); // Retrieve the token from cookies
        if (!token) {
            console.error("Token not found. Redirecting to login.");
            router.push("/auth/client-login"); // Redirect to login if no token is found
            setLoading(false);
            return;
        }

        try {
            const parsedToken = jwtDecode(token); // Parse the JSON token
            const email = parsedToken.email; // Extract email from the token

            // Fetch user data from Firebase
            const usersRef = ref(database, "users");
            const userQuery = query(usersRef, orderByChild("email"), equalTo(email));
            const snapshot = await get(userQuery);

            if (!snapshot.exists()) {
                throw new Error("No user found with the provided email.");
            }

            const user = snapshot.val();
            const userKey = Object.keys(user)[0]; // If multiple users, pick the first key
            const userData = user[userKey];

            // Proceed to add tour data
            const addUserTour = {
                ...data,
                userId: userData.uid,
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

    return { addTourData, loading, error, success };
};

export default useTourUserData;
