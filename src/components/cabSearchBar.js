
import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import OtpVerification from "@/utils/otpVeriification";
import DatePicker from "react-datepicker";
import styles from '../styles/components/advancesearchbar.module.css';

export function CabSearchBar({ emailRef, activeOtp, correctOtp, setEnteredOtp, msg, handleSendOtp, handleOtpSubmit, }) {
    const [formData, setFormData] = useState({
        fromTerm: "",
        toTerm: "",
        destination: "",
        destinations: [""],
        startDate: null,
        passenger: "1",
        phoneNumber: "",
        carOption: "",
        selectedRadio: "one-way",
        time: "",
        offerFrom: "",
    });
    const [error, setError] = useState("");

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
        const { fromTerm, phoneNumber, carOption, passenger, selectedRadio } = formData;
        if (!fromTerm || !phoneNumber || !carOption || !passenger || (selectedRadio !== "multi-city" && !emailRef.current.value)) {
            setError("Please fill all required fields.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSearch = (e) => {
        if (!validateForm(e)) return;
        const searchData = { ...formData, email: emailRef.current.value };
        console.log(searchData);
        handleSendOtp(e);
    };

    return (
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

            {activeOtp ? (
                <div>
                    <label htmlFor="otp">OTP</label>
                    <OtpVerification numberOfDigits={6} correctOtp={correctOtp} setEnteredOtp={setEnteredOtp} />
                    {msg && <p className={styles.errorMessage}>{msg}</p>}
                </div>
            ) : (
                <>
                    <div className={styles.radioOption}>
                        <input
                            type="text"
                            name="fromTerm"
                            placeholder="From"
                            value={formData.fromTerm}
                            onChange={handleChange}
                            className={styles.searchInput}
                            required
                        />
                        {formData.selectedRadio === "one-way" && (
                            <input
                                type="text"
                                name="toTerm"
                                placeholder="To"
                                value={formData.toTerm}
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
                                    <div key={index} className={styles.radioOption}>
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
                            ref={emailRef}
                            type="email"
                            name="email"
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
                onClick={handleSearch}
            >
                {activeOtp ? "Submit" : <><FaSearch />&nbsp;Search</>}
            </button>
        </>
    );
}