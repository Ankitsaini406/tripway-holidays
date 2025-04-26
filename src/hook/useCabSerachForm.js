
import { useState } from "react";
import { ref, set } from "firebase/database";
import { findAgentByAgentCode } from "@/utils/findAgent";
import { cabInitialState } from "@/types/initialState";
import { collection, addDoc, firestore, database } from "@/firebase/firebaseConfig";
import { generateAndStoreCouponCode } from "@/utils/Utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useCabSearchForm = (user) => {
    const [formData, setFormData] = useState(cabInitialState);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const route = useRouter();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    // Handler for removing tags
    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    // Helper functions for OTP and password generation
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");
    const generateRandomPassword = () =>
        Array.from({ length: 8 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"[Math.floor(Math.random() * 52)]).join("");

    const options = [
        { value: "", label: "Select Car" }, { value: "Seden", label: "Sedan" }, { value: "Suv", label: "SUV" }, { value: "Hatchback", label: "Hatchback" },
    ];

    const fromOptions = [
        { value: "", label: "From" }, 
        { value: "Jaipur", label: "Jaipur" },
        { value: "Chidawa", label: "Chidawa" }, 
        { value: "Pilani", label: "Pilani" }, 
        { value: "Khetri", label: "Khetri" },
        { value: "Mandawa", label: "Mandawa" },
        { value: "Churu", label: "Churu" },
        { value: "Sujangarh", label: "Sujangarh" },
        { value: "Ratangarh", label: "Ratangarh" },
        { value: "Salasar", label: "Salasar" },
        { value: "Ladnun", label: "Ladnun" },
        { value: "Bidasar", label: "Bidasar" },
        { value: "Sikar", label: "Sikar" },
        { value: "Reengas", label: "Reengas" },
        { value: "Khatushyam Ji", label: "Khatushyam Ji" },
        { value: "Fatehpur", label: "Fatehpur" },
        { value: "Laxmanagarh", label: "Laxmanagarh" },
        { value: "Dhod", label: "Dhod" },
        { value: "Nechwa", label: "Nechwa" },
        { value: "Khood", label: "Khood" },
        { value: "Losal", label: "Losal" },
        { value: "Neem ka Thana", label: "Neem ka Thana" },
        { value: "Jhunjhunu", label: "Jhunjhunu" },
        { value: "Nawalgarh", label: "Nawalgarh" },
    ];

    const toOptions = [
        { value: "", label: "To" }, 
        { value: "Jaipur", label: "Jaipur" },
        { value: "Chidawa", label: "Chidawa" }, 
        { value: "Pilani", label: "Pilani" }, 
        { value: "Khetri", label: "Khetri" },
        { value: "Mandawa", label: "Mandawa" },
        { value: "Churu", label: "Churu" },
        { value: "Sujangarh", label: "Sujangarh" },
        { value: "Ratangarh", label: "Ratangarh" },
        { value: "Salasar", label: "Salasar" },
        { value: "Ladnun", label: "Ladnun" },
        { value: "Bidasar", label: "Bidasar" },
        { value: "Sikar", label: "Sikar" },
        { value: "Reengas", label: "Reengas" },
        { value: "Khatushyam Ji", label: "Khatushyam Ji" },
        { value: "Fatehpur", label: "Fatehpur" },
        { value: "Laxmanagarh", label: "Laxmanagarh" },
        { value: "Dhod", label: "Dhod" },
        { value: "Nechwa", label: "Nechwa" },
        { value: "Khood", label: "Khood" },
        { value: "Losal", label: "Losal" },
        { value: "Neem ka Thana", label: "Neem ka Thana" },
        { value: "Jhunjhunu", label: "Jhunjhunu" },
        { value: "Nawalgarh", label: "Nawalgarh" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value,
        }));
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
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

        // Check for empty required fields
        if (!from || !phoneNumber || !carOption || !passenger || !email) {
            setFormData((prev) => ({ ...prev, error: "Please fill all required fields." }));
            return false;
        }

        // Validate phone number (must be 10 digits)
        if (!/^\d{10}$/.test(phoneNumber)) {
            setFormData((prev) => ({ ...prev, error: "Phone number must be 10 digits." }));
            return false;
        }

        // If validation passes, clear any error messages
        setFormData((prev) => ({ ...prev, error: null }));
        return true;
    };


    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!user) {
            route.push("/auth/signup");
            toast.info("Create your account first to unlock seamless ride booking! 🚖✨");
        }
        if (!validateForm()) return;

        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        try {
            setFormData((prev) => ({ ...prev, success: "OTP sent successfully!" }));
        } catch {
            setFormData((prev) => ({ ...prev, error: "Failed to send OTP. Please try again." }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (enteredOtp !== correctOtp) {
            setFormData((prev) => ({ ...prev, error: "Invalid OTP. Please try again." }));
            return;
        }

        setFormData((prev) => ({ ...prev, success: "OTP Verified Successfully!", loading: true }));

        const name = user?.displayName || `${formData.firstName} ${formData.lastName}`;
        const { firstName, lastName, loading, msg, error, success, ...filteredData } = formData;
        let userData = {};

        const couponCode = await generateAndStoreCouponCode();

        if (!user) {
            // const password = generateRandomPassword();
            // try {
            //     setFormData((prev) => ({ ...prev, loading: true }));
            //     const newUser = await signupUserWithEmailAndPassword(
            //         formData.email,
            //         password,
            //         { name, phoneNumber: formData.phoneNumber, password, role: 'User', couponCode },
            //         "users"
            //     );

            //     if (!newUser) throw new Error("Failed to create user");

            //     userData = {
            //         agentId: null,
            //         agentPhoneNumber: formData.phoneNumber,
            //     };

            // } catch (err) {
            //     setFormData((prev) => ({ ...prev, error: err.message, loading: false }));
            //     return;
            // }
            // finally {
            //     setFormData((prev) => ({ ...prev, loading: false }));
            // }
            route.push("/auth/user/signup");
            toast.info("Create your account first to unlock seamless ride booking! 🚖✨");
        } else {
            userData = {
                agentId: user.uid,
                agentPhoneNumber: formData.phoneNumber,
                couponCode: couponCode,
            };
        }

        const validDestinations = formData.destinations.filter((dest) => dest.trim() !== "");
        const dataToSend = { ...filteredData, ...userData, name, destinations: validDestinations };
        const collectionName =
            formData.selectedRadio === "one-way" ? "one-way" : formData.selectedRadio === "round-trip" ? "round-trip" : "multi-city";

        try {
            setFormData((prev) => ({ ...prev, loading: true }));
            const docRef = await addDoc(collection(firestore, collectionName), dataToSend);
            const dbRef = ref(database, `users/${user?.uid}/tours/${docRef.id}`);
            await set(dbRef, { tourId: docRef.id, couponCode: couponCode });

            findAgentByAgentCode(formData.offerFrom, docRef.id);
            setFormData({
                ...cabInitialState, // Reset form to initial state
                success: "Data successfully sent to Firebase",
            });
            toast.success("All set! Your ride details will be shared on email and WhatsApp shortly. 🌍🚗");
            setActiveOtp(false);
        } catch (err) {
            setFormData((prev) => ({ ...prev, loading: false }));
            setFormData((prev) => ({ ...prev, error: `Error sending data to Firebase. ${err}` }));
        }
        finally {
            setFormData((prev) => ({ ...prev, loading: false }));
        }
    };

    return {
        formData,
        activeOtp,
        correctOtp,
        options,
        fromOptions,
        toOptions,
        inputValue,
        tags,
        handleKeyDown,
        removeTag,
        handleInputChange,
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
