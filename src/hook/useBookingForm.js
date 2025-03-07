"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ref, get, set } from "firebase/database";
import { database } from "@/firebase/firebaseConfig";

export default function useBookingForm(user) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const title = searchParams.get("title");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const startDate = searchParams.get("startDate");
    const time = searchParams.get("time");
    const selectedCar = searchParams.get("selectedCar");

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        pickupPoint: "",
        dropPoint: "",
        offerCode: "",
    });

    const [correctOtp, setCorrectOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [activeTab, setActiveTab] = useState("inclusions");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const aisensy = process.env.AI_SENSY;

    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    useEffect(() => {
        if (!title || !from || !to) {
            router.back();
        }
    }, [title, from, to, startDate, router]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value || "",
        }));
    };

    const checkUserExistence = async (phoneNumber) => {
        const dbRef = ref(database, "users");
    
        try {
            const snapshot = await get(dbRef);
    
            if (snapshot.exists()) {
                const users = snapshot.val();
    
                const matchedUser = Object.values(users).find(user => user.phoneNumber === phoneNumber);
    
                if (matchedUser) {
                    toast.success("User data found.");
                    return;
                } else {
                    const userRef = ref(database, `users/${phoneNumber}`);
                    await set(userRef, {
                        name: formData.name || "",
                        phoneNumber: phoneNumber || "",
                        email: formData.email || "",
                    });
                    toast.success("User data saved successfully!");
                }
            } else {
                toast.info("No users found in database.");
            }
        } catch (error) {
            console.error("Error checking user:", error);
            toast.error("Error fetching user details.");
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phoneNumber || !formData.email || !formData.pickupPoint) {
            toast.error("Please fill in all details before proceeding.");
            return;
        }

        checkUserExistence(formData.phoneNumber);

        const otp = generateOtp();
        setCorrectOtp(otp);
        setIsOtpSent(true);

        const requestBody = {
            apiKey: aisensy,
            campaignName: "CustomerOTP",
            destination: "+91" + formData.phoneNumber,
            userName: formData.name,
            templateParams: [otp],
            buttons: [
                {
                    "type": "button",
                    "sub_type": "url",
                    "index": 0,
                    "parameters": [
                        {
                            "type": "text",
                            "text": otp
                        }
                    ]
                }
            ],
        };

        try {
            const res = await fetch("/api/phone/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Failed to send message:", data);
                throw new Error(data.error || "Failed to send message");
            }

            console.log("WhatsApp Response:", data);
            toast.success("OTP sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending OTP. Try again.");
            setIsOtpSent(false);
        }
    };

    const sendMessage = async () => {

        if(enteredOtp !== correctOtp) {
            toast.error("Incorrect OTP. Please try again.");
            return;
        }

        const campaign = title === "one-way"
            ? "onewaybookingfor website"
            : title === "round-trip"
                ? "roundtripforwebsite"
                : "multicitybookingforwebsite";

        const url = title === "one-way"
            ? "https://www.theglobeandmail.com/resizer/v2/BYBSVGDHZZAFZP7LTGXMHPXZ3Q?auth=ccda29f1d41119ef2fc927c805845397675c96ae83717fa4801a3fdc09f016f1&width=300&height=200&quality=80&smart=true"
            : title === "round-trip"
                ? "https://tripwayholidays.in/cab/round-trip-whatsapp.png"
                : "https://tripwayholidays.in/cab/multi-city-whatsapp.webp";

        const fileName = title === "one-way"
            ? "PNG"
            : title === "round-trip"
                ? "PNG"
                : "multi-city-whatsapp.webp";

        const requestBody = {
            apiKey: aisensy,
            campaignName: campaign,
            destination: "+91" + formData.phoneNumber,
            userName: formData.name,
            templateParams: [formData.name, formData.pickupPoint, title === "multi-city" ? to : formData.dropPoint, startDate, time, selectedCar, "500"],
            media: {
                url: url,
                filename: fileName
            }
        };

        try {
            const res = await fetch("/api/phone/book-cab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Failed to send message:", data);
                throw new Error(data.error || "Failed to send message");
            }

            console.log("WhatsApp Response:", data);
            toast.success("All set! Your ride details will be shared on WhatsApp shortly. 🌍🚗");
            setFormData({ name: "", phoneNumber: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message. Try again.");
        }
    };

    return {
        title,
        from,
        to,
        startDate,
        time,
        selectedCar,
        formData,
        correctOtp,
        enteredOtp,
        isOtpSent,
        checkUserExistence,
        handleChange,
        handleSendOtp,
        setEnteredOtp,
        sendMessage,
        activeTab,
        setActiveTab,
    };
}