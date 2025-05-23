"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { checkUserExistence, generateAndStoreCouponCode } from "@/utils/Utils";
import { addDoc, collection } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { database, firestore } from "@/firebase/firebaseConfig";
import { findAgentByAgentCode } from "@/utils/findAgent";
import { initiateRazorpayPayment, sendWhatsAppMessage } from "@/utils/apiUtils";
// import { postSheetData } from "@/app/action/googleAction";

export default function useBookingForm(user, bookingData) {
    const router = useRouter();

    const title = bookingData.title;
    const from = bookingData.from;
    const to = bookingData.to;
    const startDate = bookingData.startDate;
    const time = bookingData.time;
    const selectedCar = bookingData.selectedCar;
    const amount = bookingData.amount;
    const distance = bookingData.distance;

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        countryCode: "",
        email: "",
        pickupPoint: "",
        dropPoint: "",
        offerFrom: "",
        paymentType: "initial",
    })

    const [correctOtp, setCorrectOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [activeTab, setActiveTab] = useState("inclusions");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const aisensy = process.env.AI_SENSY;
    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    const isNightChargeApplicable = hours >= 22 || hours < 6;
    const nightCharge = isNightChargeApplicable ? 200 : 0;
    const gstAmount = Math.round(amount * 0.05);
    const total = Math.round(amount + gstAmount + nightCharge);

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

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.countryCode || !formData.phoneNumber || !formData.email || !formData.pickupPoint) {
            toast.error("Please fill in all details before proceeding.");
            return;
        }

        // checkUserExistence(`${formData.countryCode}${formData.phoneNumber}`, formData);

        const otp = generateOtp();
        // console.log(otp);
        setCorrectOtp(otp);
        setIsOtpSent(true);

        const requestBody = {
            apiKey: aisensy,
            campaignName: "CustomerOTP",
            destination: formData.countryCode + formData.phoneNumber,
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
            setLoading(true);
            const response = await sendWhatsAppMessage(requestBody);
            if (!response.success) {
                throw new Error(response.error);
            }

            console.log("WhatsApp Response:", data);
            toast.success("OTP sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
            toast.error("Error sending OTP. Try again.");
            setIsOtpSent(false);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        // if (enteredOtp !== correctOtp) {
        //     toast.error("Incorrect OTP. Please try again.");
        //     return;
        // }

        if (!formData.name || !formData.countryCode || !formData.phoneNumber || !formData.email || !formData.pickupPoint) {
            toast.error("Please fill in all details before proceeding.");
            return;
        }

        checkUserExistence(`${formData.countryCode}${formData.phoneNumber}`, formData);
        setLoading(true);
        const selectedAmount = formData.paymentType === "initial" ? 500 : total;

        try {
            initiateRazorpayPayment({ amount: selectedAmount, total, formData, onSuccess: handleBooking});
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (paymentId, paidAmount, total) => {
        try {
            const couponCode = await generateAndStoreCouponCode("User");

            const validDestinations = Array.isArray(to) ? to : to.split(",").filter(dest => dest.trim() !== "");
            const destinationsField =
                title === "one-way" ? { to } :
                    title === "round-trip" ? { destination: to } :
                        { destinations: validDestinations };

            const dataToSend = {
                ...formData,
                isComplete: false,
                isRefunde: false,
                minPayment: formData.paymentType === "initial",
                paymentId,
                amount: paidAmount,
                total,
                distance,
                couponCode,
                carOption: selectedCar,
                selectedRadio: title,
                from,
                startDate,
                time,
                ...destinationsField
            };

            const collectionName = {
                "one-way": "one-way",
                "round-trip": "round-trip",
                "multi-city": "multi-city"
            }[title];

            const docRef = await addDoc(collection(firestore, collectionName), dataToSend);
            const dbRef = ref(database, `users/${formData.countryCode}${formData.phoneNumber}/tours/${docRef.id}`);
            await set(dbRef, { tourId: docRef.id, couponCode });

            findAgentByAgentCode(formData.offerFrom, docRef.id);
            const allData = {...formData, title, from, to, startDate, time, selectedAmount, amount, gstAmount, nightCharge, total, selectedCar, distance };
            await fetch(`${apiPoint}api/google/spardsheet`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(allData),
            });
            toast.success("All set! Your ride is Booked. 🌍🚗");
            // const campaignMap = {
            //     "one-way": "onewaybookingforwebsite",
            //     "round-trip": "roundtripforwebsite",
            //     "multi-city": "multicitybookingforwebsite"
            // };

            // const mediaMap = {
            //     "one-way": {
            //         url: "https://www.theglobeandmail.com/resizer/v2/BYBSVGDHZZAFZP7LTGXMHPXZ3Q?auth=ccda29f1d41119ef2fc927c805845397675c96ae83717fa4801a3fdc09f016f1&width=300&height=200&quality=80&smart=true",
            //         filename: "PNG"
            //     },
            //     "round-trip": {
            //         url: "https://tripwayholidays.in/cab/round-trip-whatsapp.png",
            //         filename: "PNG"
            //     },
            //     "multi-city": {
            //         url: "https://tripwayholidays.in/cab/multi-city-whatsapp.webp",
            //         filename: "multi-city-whatsapp.webp"
            //     }
            // };

            // const requestBody = {
            //     apiKey: aisensy,
            //     campaignName: campaignMap[title],
            //     destination: `${formData.countryCode}${formData.phoneNumber}`,
            //     userName: formData.name,
            //     templateParams: [
            //         formData.name,
            //         formData.pickupPoint,
            //         title === "multi-city" ? to : formData.dropPoint,
            //         startDate,
            //         time,
            //         selectedCar,
            //         "500"
            //     ],
            //     media: mediaMap[title]
            // };

            // // Send WhatsApp message
            // const response = await sendWhatsAppMessage(requestBody);
            // if (!response.success) {
            //     throw new Error(response.error);
            // }

            // console.log("WhatsApp Response:", response.data);
            toast.success("All set! Your ride details will be shared on WhatsApp shortly. 🌍🚗");
            router.push(`/booking-success?name=${encodeURIComponent(formData.name)}&triptpye=${encodeURIComponent(collectionName)}&amount=${amount}&paymentId=${paymentId}`);
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return {
        title,
        from,
        to,
        startDate,
        time,
        selectedCar,
        isNightChargeApplicable,
        nightCharge,
        gstAmount,
        amount,
        total,
        distance,
        formData,
        correctOtp,
        enteredOtp,
        isOtpSent,
        loading,
        handleChange,
        handleSendOtp,
        setEnteredOtp,
        sendMessage,
        activeTab,
        setActiveTab,
    };
}