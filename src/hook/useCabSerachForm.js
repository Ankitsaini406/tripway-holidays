
import { useState } from "react";
import { ref, set } from "firebase/database";
import useSendEmail from "@/hook/useSendEmail";
import { findAgentByAgentCode } from "@/utils/findAgent";
import { cabInitialState } from "@/types/initialState";
import { collection, addDoc, firestore, database } from "@/firebase/firebaseConfig";
import { generateAndStoreCouponCode } from "@/utils/Utils";

const useCabSearchForm = (user, signupUserWithEmailAndPassword) => {
    const [formData, setFormData] = useState(cabInitialState);
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const { sendEmail } = useSendEmail();

    // Helper functions for OTP and password generation
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
    const generateRandomPassword = () =>
        Array.from({ length: 8 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"[Math.floor(Math.random() * 52)]).join("");

    const options = [
        { value: "", label: "Select Car" }, { value: "Seden", label: "Sedan" }, { value: "Suv", label: "SUV" }, { value: "Hatchback", label: "Hatchback" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value,
        }));
    };

    const handleMultiCityChange = (index, value) => {
        setFormData((prev) => {
            const updatedDestinations = [...prev.destinations];
            updatedDestinations[index] = value;
            return { ...prev, destinations: updatedDestinations };
        });
    };

    const addDestination = () => {
        setFormData((prev) => {
            if (prev.destinations.length < 10) {
                return { ...prev, destinations: [...prev.destinations, ""] };
            }
            return prev;
        });
    };

    const removeDestination = (index) => {
        setFormData((prev) => ({
            ...prev,
            destinations: prev.destinations.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        const { from, phoneNumber, carOption, passenger, email } = formData;
        if (!from || !phoneNumber || !carOption || !passenger || !email) {
            setFormData((prev) => ({ ...prev, error: "Please fill all required fields." }));
            return false;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            setFormData((prev) => ({ ...prev, error: "Phone number must be 10 digits." }));
            return false;
        }
        setFormData((prev) => ({ ...prev, error: null }));
        return true;
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        const emailContent = {
            email: formData.email,
            subject: "Your OTP for Travel Booking Confirmation",
            name: user?.displayName || `${formData.firstName} ${formData.lastName}`,
            otp,
            url: "send-otp",
        };

        try {
            await sendEmail(emailContent);
            setFormData((prev) => ({ ...prev, success: "OTP sent successfully!" }));
        } catch {
            setFormData((prev) => ({ ...prev, error: "Failed to send OTP. Please try again." }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        if (enteredOtp !== correctOtp) {
            setFormData((prev) => ({ ...prev, error: "Invalid OTP. Please try again." }));
            return;
        }
    
        setFormData((prev) => ({ ...prev, success: "OTP Verified Successfully!", loading: true }));
    
        const name = user?.displayName || `${formData.firstName} ${formData.lastName}`;
        const { firstName, lastName, loading, msg, error, success, ...filteredData } = formData;
        let userData = {};
    
        try {
            setFormData((prev) => ({ ...prev, loading: true }));
            
            // Handle user creation
            if (!user) {
                const password = generateRandomPassword();
                const newUser = await signupUserWithEmailAndPassword(
                    formData.email,
                    password,
                    { name, phoneNumber: formData.phoneNumber, password, isAgent: false },
                    "users"
                );
    
                if (!newUser) throw new Error("Failed to create user");
    
                userData = {
                    agentId: null,
                    agentPhoneNumber: formData.phoneNumber,
                };
    
                const emailContent = {
                    email: formData.email,
                    subject: "Welcome to TripWay Holidays! 🌍",
                    name,
                    otp: null,
                    password,
                    url: "account-created",
                };
    
                await sendEmail(emailContent);
            } else {
                userData = {
                    agentId: user.uid,
                    agentPhoneNumber: user.phoneNumber,
                };
            }
    
            // Generate coupon code and update Firestore and Realtime Database
            const userCouponCode = await generateAndStoreCouponCode();
            const agentCouponCode = await generateAndStoreCouponCode();
            const tourCodes = [userCouponCode, agentCouponCode];
    
            const validDestinations = formData.destinations.filter((dest) => dest.trim() !== "");
            const dataToSend = { ...filteredData, ...userData, name, destinations: validDestinations, tourCodes };
    
            // Add coupon code to the user's Firebase Realtime Database
            const userRef = ref(database, `users/${user?.uid || "unknown"}`);
            await set(userRef, {
                ...userData,
                userCouponCode,
                name,
            });
    
            // Add coupon code to the agent's Firebase Realtime Database (if an agent exists)
            if (userData.agentId) {
                const agentRef = ref(database, `agents/${userData.agentId}`);
                await set(agentRef, {
                    agentCouponCode,
                    name,
                    agentPhoneNumber: userData.agentPhoneNumber,
                });
            }
    
            // Add to Firestore collection (one-way, round-trip, or multi-city)
            const collectionName =
                formData.selectedRadio === "one-way" ? "one-way" : formData.selectedRadio === "round-trip" ? "round-trip" : "multi-city";
    
            const docRef = await addDoc(collection(firestore, collectionName), dataToSend);
            const dbRef = ref(database, `users/${user?.uid || "unknown"}/tours/${docRef.id}`);
            await set(dbRef, { tourId: docRef.id });
    
            findAgentByAgentCode(formData.offerFrom, docRef.id);
    
            setFormData({
                ...cabInitialState, // Reset form to initial state
                success: "Data successfully sent to Firebase with coupon code",
            });
            setActiveOtp(false);
    
        } catch (err) {
            setFormData((prev) => ({ ...prev, loading: false }));
            setFormData((prev) => ({ ...prev, error: `Error: ${err.message}` }));
        } finally {
            setFormData((prev) => ({ ...prev, loading: false }));
        }
    };
    

    return {
        formData,
        activeOtp,
        correctOtp,
        options,
        setFormData,
        handleChange,
        handleMultiCityChange,
        addDestination,
        removeDestination,
        handleSendOtp,
        handleSubmit,
        validateForm,
        setEnteredOtp,
    };
};

export default useCabSearchForm;
