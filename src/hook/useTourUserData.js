import { useState } from "react";
import { getCookie } from "cookies-next";
import { database } from "@/firebase/firebaseConfig";
import { jwtDecode } from "jwt-decode";
import { ref, get } from "firebase/database";
import { useRouter } from "next/navigation";
import { initiateRazorpayPayment } from "@/utils/apiUtils";
import { checkUserExistence } from "@/utils/Utils";
import { toast } from "react-toastify";

const useTourUserData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    const validateUserData = (data) => {
        if (!data.userName || !data.userCounterCode || !data.userPhoneNumber || !data.userEmail || !data.userFrom) {
            toast.error("Please fill in all details before proceeding.");
            return false;
        }
        return true;
    };

    const addTourData = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // 1. **Validate User Input**
            if (!validateUserData(data)) {
                setLoading(false);
                return;
            }

            // 2. **Check if User Exists**
            const userExists = await checkUserExistence(`${data.userCounterCode}${data.userPhoneNumber}`, data);
            if (!userExists) {
                toast.success("New user created and will be logged in.");
            }

            // 3. **Fetch User Data from Firebase**
            const userRef = ref(database, `users/${data.userCounterCode}${data.userPhoneNumber}`);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                throw new Error("No user found with the provided details.");
            }

            const user = snapshot.val();
            const userData = user.uid ? user : Object.values(user)[0]; // Handle object structure

            // 4. **Initiate Payment**
            initiateRazorpayPayment({
                amount: data.amount,
                data,
                onSuccess: async () => {
                    try {
                        // 5. **Add Tour Data After Successful Payment**
                        const addUserTour = {
                            ...data,
                            paymentId,
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

                            // const allData = {
                            //     name: data.userName,
                            //     from: data.userFrom,
                            //     passenger: data.passenger,
                            //     countryCode: data.userCounterCode,
                            //     phoneNumber: data.userPhoneNumber,
                            //     email: data.userEmail,
                            //     tourName: data.tourName,
                            //     price: data.price,
                            //     // startDate: data.startDate,
                            //     isPast: data.isPast
                            // };

                            // await fetch(`${apiPoint}api/google/tour-spardsheet`, {
                            //     method: "POST",
                            //     headers: { "Content-Type": "application/json" },
                            //     body: JSON.stringify(allData),
                            // });
                            toast.success("Tour booked successfully!");
                            router.push(`/booking-success?name=${encodeURIComponent(data.name)}&triptpye=group-tours&amount=${data.amount}&paymentId=${paymentId}`);
                        } else {
                            throw new Error("Failed to add details.");
                        }
                    } catch (error) {
                        setError(error.message);
                        toast.error(error.message);
                    }
                },
            });
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { addTourData, loading, error, success };
};

export default useTourUserData;
