
import React, { useState } from "react";
import OtpVerification from "@/utils/otpVeriification";
import DatePicker from "react-datepicker";
import useSendEmail from "@/hook/useSendEmail";
import styles from '../styles/components/advancesearchbar.module.css';
import { collection, addDoc, firestore } from "@/firebase/firebaseConfig";
import { useClient } from "@/context/UserContext";

export function CabSearchBar() {
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
    });
    const [error, setError] = useState("");
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const { user } = useClient();
    const { sendEmail, loading, success } = useSendEmail();

    // Function to generate a 6-digit OTP
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    const handleSendOtp = async (e) => {
        if (!validateForm(e)) return;
        e.preventDefault();
        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        // Prepare the email content
        const emailContent = {
            email: formData.email,
            subject: "Your OTP Code",
            message: `Your OTP code is: ${otp}`,
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
        { value: "seden", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "hatchback", label: "Hatchback" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate form inputs
        if (!validateForm(e)) return;

        if (enteredOtp === correctOtp) {
            setMsg("✅ OTP Verified Successfully!");
            setActiveOtp(false);

            const { selectedRadio, ...filteredData } = formData;
            const userData = {
                ...(user?.uid && { agentId: user.uid }),
                ...(user?.phoneNumber && { agentPhoneNumber: user.phoneNumber }),
            };
            const dataToSend = { ...filteredData, ...userData };

            let collectionName;
            switch (selectedRadio) {
                case "one-way":
                    collectionName = "one-way";
                    break;
                case "round-trip":
                    collectionName = "round-trip";
                    break;
                case "multi-city":
                    collectionName = "multi-city";
                    break;
                default:
                    setError("Please select a valid trip type.");
                    return;
            }

            try {
                const docRef = await addDoc(collection(firestore, collectionName), dataToSend);
                console.log("Document written with ID:", docRef.id);
                setError("");
                setActiveOtp(false);

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
                });
                alert("Data successfully sent to Firebase");
            } catch (err) {
                console.error("Error adding document:", err);
                setError("Error sending data to Firebase. Please try again.");
            }
        } else {
            setMsg("❌ Invalid OTP. Please try again.");
            return;
        }
    };


    const handleSearch = (e) => {
        handleSendOtp(e);
    };

    return (
        <>
            {activeOtp ? (
                <div>
                    <label htmlFor="otp">OTP</label>
                    <OtpVerification numberOfDigits={6} correctOtp={correctOtp} setEnteredOtp={setEnteredOtp} />
                    {msg && <p className={styles.errorMessage}>{msg}</p>}
                </div>
            ) : (
                <>
                    <div className={styles.radioOption}>
                        {["one-way", "round-trip", "multi-city"].map((option) => (
                            <div key={option}>
                                <input
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
                                <FaPlus /> Add Destination
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

                    <div className={styles.radioOption}>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={styles.searchInput}
                            required
                        />
                        <input
                            value={formData.email}
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={styles.searchInput}
                            required
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