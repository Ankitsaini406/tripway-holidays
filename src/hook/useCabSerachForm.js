
import { useState } from "react";
import { ref, set } from "firebase/database";
import useSendEmail from "@/hook/useSendEmail";
import { findAgentByAgentCode } from "@/utils/findAgent";
import { cabInitialState } from "@/types/initialState";
import { collection, addDoc, firestore, database } from "@/firebase/firebaseConfig";

const useCabSearchForm = (user, signupUserWithEmailAndPassword) => {
    const [formData, setFormData] = useState(cabInitialState);
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const { sendEmail } = useSendEmail();

    // Helper functions for OTP and password generation
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
    const generateRandomPassword = () =>
        Array.from({ length: 6 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 52)]).join("");

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
        const { firstName, lastName, ...filteredData } = formData;
        let userData = {};

        if (!user) {
            const password = generateRandomPassword();
            try {
                setFormData((prev) => ({ ...prev, loading: true }));
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
            } catch (err) {
                setFormData((prev) => ({ ...prev, error: err.message, loading: false }));
                return;
            }
            finally {
                setFormData((prev) => ({ ...prev, loading: false }));
            }
        } else {
            userData = {
                agentId: user.uid,
                agentPhoneNumber: user.phoneNumber,
            };
        }

        const validDestinations = formData.destinations.filter((dest) => dest.trim() !== "");
        const dataToSend = { ...filteredData, ...userData, name, destinations: validDestinations };
        const collectionName =
            formData.selectedRadio === "one-way" ? "one-way" : formData.selectedRadio === "round-trip" ? "round-trip" : "multi-city";

        try {
            setFormData((prev) => ({ ...prev, loading: true }));
            const docRef = await addDoc(collection(firestore, collectionName), dataToSend);
            const dbRef = ref(database, `users/${user?.uid || "unknown"}/tours/${docRef.id}`);
            await set(dbRef, { tourId: docRef.id });
            findAgentByAgentCode(formData.offerFrom, docRef.id);

            setFormData({
                ...initialState, // Reset form to initial state
                success: "Data successfully sent to Firebase",
            });
        } catch (err) {
            setFormData((prev) => ({ ...prev, loading: false }));
            setFormData((prev) => ({ ...prev, error: "Error sending data to Firebase." }));
        }
        finally {
            setFormData((prev) => ({ ...prev, loading: false }));
        }
    };

    return {
        formData,
        activeOtp,
        correctOtp,
        enteredOtp,
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
