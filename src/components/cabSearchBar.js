
import React, { useState } from "react";
import OtpVerification from "@/utils/otpVeriification";
import DatePicker from "react-datepicker";
import useSendEmail from "@/hook/useSendEmail";
import { useClient } from "@/context/UserContext";
import { collection, addDoc, firestore, database } from "@/firebase/firebaseConfig";
import styles from '../styles/components/advancesearchbar.module.css';
import { ref, set } from "firebase/database";

export function CabSearchBar() {
    const { user, signupUserWithEmailAndPassword } = useClient();
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        destination: "",
        destinations: [""],
        startDate: null,
        passenger: "1",
        phoneNumber: "",
        carOption: "",
        selectedRadio: "one-way",
        time: "",
        offerFrom: "",
        email: "",
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState("");
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const { sendEmail, loading, success } = useSendEmail();

    const name = user?.displayName || `${formData.firstName} ${formData.lastName}`;

    // Function to generate a 6-digit OTP
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    function generateRandomPassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let password = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }

    const handleSendOtp = async (e) => {
        if (!validateForm(e)) return;
        e.preventDefault();
        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        // Prepare the email content
        const emailContent = {
            email: formData.email,
            subject: 'Your OTP for Travel Booking Confirmation',
            name: name,
            otp: otp,
            password: null,
            tourDate: null,
            tourTime: null,
            tourLocation: null,
            url: 'send-otp',
        };

        // Send email using the hook
        await sendEmail(emailContent);

        // Check success or error
        if (success) {
            alert('OTP sent successfully!');
        } else if (error) {
            alert(`Failed to send OTP. Please try again. Error: ${error}`);
        }
    };

    const options = [
        { value: "", label: "Select Car" },
        { value: "Seden", label: "Sedan" },
        { value: "Suv", label: "SUV" },
        { value: "Hatchback", label: "Hatchback" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value }));
    };

    const handleMultiCityChange = (index, value) => {
        const updatedDestinations = [...formData.destinations];
        updatedDestinations[index] = value;
        setFormData((prevData) => ({ ...prevData, destinations: updatedDestinations }));
    };

    const addDestination = () => {
        if (formData.destinations.length < 10) {
            setFormData((prevData) => ({ ...prevData, destinations: [...prevData.destinations, ""] }));
        }
    };

    const removeDestination = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            destinations: prevData.destinations.filter((_, i) => i !== index),
        }));
    };

    const validateForm = (e) => {
        e.preventDefault();
        const { from, phoneNumber, carOption, passenger, email } = formData;
    
        if (!from || !phoneNumber || !carOption || !passenger || !email) {
            setError("Please fill all required fields.");
            return false;
        }
    
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Phone number must be 10 digits.");
            return false;
        }
    
        setError("");
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(e)) return;
        if (enteredOtp !== correctOtp) {
            setMsg("❌ Invalid OTP. Please try again.");
            return;
        }
        setMsg("✅ OTP Verified Successfully!");

        const { selectedRadio, firstName, lastName, ...filteredData } = formData;
        let userData = {};
        if (!user) {
            const password = generateRandomPassword();
            const newUser = await signupUserWithEmailAndPassword(
                formData.email,
                password,
                { name, phoneNumber: formData.phoneNumber, password },
                "users"
            );
            if (!newUser) return setError("Failed to create user. Please try again.");
            userData = {
                agentId: user?.uid || "N/A",
                agentPhoneNumber: user?.phoneNumber || formData.phoneNumber || "Unknown",
            };
            const emailContent = {
                email: formData.email,
                subject: 'Welcome to TripWay Holidays! 🌍',
                name: name,
                otp: null,
                password: password,
                tourDate: null,
                tourTime: null,
                tourLocation: null,
                url: 'account-created',
            };

            // Send email using the hook
            await sendEmail(emailContent);
        } else {
            userData = { agentId: user.uid, agentPhoneNumber: user?.phoneNumber || formData.phoneNumber };
        }

        const validDestinations = formData.destinations.filter((destination) => destination.trim() !== "");
        const dataToSend = { ...filteredData, ...userData, name, destinations: validDestinations };
        const collectionName = formData.selectedRadio === "one-way" ? "one-way"
            : formData.selectedRadio === "round-trip" ? "round-trip"
                : "multi-city";

        try {
            console.log("Data being sent to Firestore:", dataToSend);
            const docRef = await addDoc(collection(firestore, collectionName), dataToSend);

            const dbRef = ref(database, `users/${user.uid}/tours/${docRef.id}`);
            await set(dbRef, {
                tourId: docRef.id,
            });

            alert("Data successfully sent to Firebase");
            setFormData({
                from: "",
                to: "",
                destination: "",
                destinations: [""],
                startDate: null,
                passenger: "1",
                phoneNumber: "",
                carOption: "",
                selectedRadio: "one-way",
                time: "",
                offerFrom: "",
                email: "",
                firstName: '',
                lastName: '',
            });
        } catch (err) {
            console.error(err);
            setError("Error sending data to Firebase.");
        }

        setActiveOtp(false);
    };

    return (
        <>
            {activeOtp ? (
                <div>
                    <label style={{ display: 'block', margin: '0 0 15px 0' }} htmlFor="otp">Your OTP for Travel Booking Confirmation</label>
                    <OtpVerification numberOfDigits={6} correctOtp={correctOtp} setEnteredOtp={setEnteredOtp} handleSendOtp={handleSendOtp} />
                    {msg && <p className={styles.errorMessage}>{msg}</p>}
                </div>
            ) : (
                <>
                    <div className={styles.radioOption}>
                        {["one-way", "round-trip", "multi-city"].map((option) => (
                            <div key={option}>
                                <input
                                    name={option}
                                    type="radio"
                                    value={option}
                                    checked={formData.selectedRadio === option}
                                    onChange={() => setFormData((prevData) => ({ ...prevData, selectedRadio: option }))}
                                />
                                <label>{option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, "")}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.radioOption}>
                        <input
                            type="text"
                            name="from"
                            placeholder="From"
                            value={formData.from}
                            onChange={handleChange}
                            className={styles.searchInput}
                            required
                        />
                        {formData.selectedRadio === "one-way" && (
                            <input
                                type="text"
                                name="to"
                                placeholder="To"
                                value={formData.to}
                                onChange={handleChange}
                                className={styles.searchInput}
                                required
                            />
                        )}
                    </div>

                    {formData.selectedRadio === "round-trip" && (
                        <div className={styles.radioOption}>
                            <input
                                type="text"
                                name="destination"
                                placeholder="Destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className={styles.searchInput}
                            />
                        </div>
                    )}

                    {formData.selectedRadio === "multi-city" && (
                        <>
                            <div>
                                {formData.destinations.map((destination, index) => (
                                    <div key={index} style={{ flexDirection: 'row' }} className={styles.radioOption}>
                                        <input
                                            type="text"
                                            placeholder={`Destination ${index + 1}`}
                                            value={destination}
                                            onChange={(e) => handleMultiCityChange(index, e.target.value)}
                                            className={styles.searchInput}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeDestination(index)}
                                            className={styles.removeButton}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addDestination} className={styles.addButton} disabled={formData.destinations.length >= 10}>
                                Add Destination
                            </button>
                        </>
                    )}

                    <div className={styles.radioOption}>
                        <DatePicker
                            selected={formData.startDate}
                            onChange={(date) => setFormData((prevData) => ({ ...prevData, startDate: date }))}
                            className={styles.searchInput}
                            placeholderText="Start Date"
                            required
                        />
                        <input
                            style={{ padding: '0.35rem' }}
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={styles.searchInput}
                            required
                        />
                    </div>

                    <div className={styles.radioOption}>
                        <select
                            name="carOption"
                            value={formData.carOption}
                            onChange={handleChange}
                            className={styles.searchInput}
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="passenger"
                            value={formData.passenger}
                            onChange={handleChange}
                            className={styles.searchInput}
                            min="1"
                            max="7"
                            required
                        />
                    </div>

                    {/* {
                        user ? null : (
                            <> */}
                                <div className={styles.radioOption}>
                                    <ContactDetails
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        handleChange={handleChange}
                                        className={styles.searchInput}
                                        palceholder='First Name'
                                    />
                                    <ContactDetails
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        handleChange={handleChange}
                                        className={styles.searchInput}
                                        palceholder='Last Name'
                                    />
                                </div> 
                                {/* </>
                        )
                    } */}

                    <div className={styles.radioOption}>
                        <ContactDetails
                            type='number'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            palceholder='Phone Number'
                        />
                        <ContactDetails
                            type='email'
                            name='email'
                            value={formData.email}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            palceholder='Email'
                        />
                    </div>

                    {formData.selectedRadio === "one-way" && (
                        <input
                            type="text"
                            name="offerFrom"
                            placeholder="Offer From"
                            value={formData.offerFrom}
                            onChange={handleChange}
                            className={styles.searchInput}
                        />
                    )}
                </>
            )}

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button
                className={styles.searchButton}
                onClick={activeOtp ? handleSubmit : handleSendOtp}
                disabled={enteredOtp !== correctOtp && activeOtp}
            >
                {activeOtp ? "Submit" : 'Book Now'}
            </button>
        </>
    );
}

export function ContactDetails({ type, name, value, handleChange, className, palceholder }) {
    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className={className}
                placeholder={palceholder}
            />
        </>
    );
}