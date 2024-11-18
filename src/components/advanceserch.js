import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { FaSearch, FaPlus } from "react-icons/fa";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/components/advancesearchbar.module.css';
import OtpVerification from "@/utils/otpVeriification";
import { useRouter } from "next/navigation";

function AdvancedSearchBar() {
    const [activeLink, setActiveLink] = useState("cabs");
    const route = useRouter();
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const emailRef = useRef();

    // Function to generate a 6-digit OTP
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        try {
            const response = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailRef.current.value, otp }),
            });
            if (response.status === 200) {
                alert('OTP sent successfully!');
            } else {
                alert('Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('An error occurred.');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setMsg(enteredOtp === correctOtp ? "✅ OTP Verified Successfully!" : "❌ Invalid OTP. Please try again.");
    };

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className={styles.selectionBox}>
            <ul className={styles.selectionList}>
                {["cabs", "tour-packages", "group-tour"].map((link) => (
                    <li key={link}>
                        <a
                            className={`${styles.searchSelectButton} ${activeLink === link ? styles.active : ""}`}
                            href={`#${link}`}
                            onClick={() => handleClick(link)}
                        >
                            <span className={styles.searchSpanIcons}>
                                {link === "cabs" && <PiCarProfileLight />}
                                {link === "tour-packages" && <MdCardTravel />}
                                {link === "group-tour" && <HiOutlineUserGroup />}
                            </span>
                            &nbsp;{link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, "")}
                        </a>
                    </li>
                ))}
            </ul>


            <div className={styles.advancedSearchBar}>
                {activeLink === "cabs" && (
                    <CabSearchBar
                        activeOtp={activeOtp}
                        correctOtp={correctOtp}
                        setEnteredOtp={setEnteredOtp}
                        emailRef={emailRef}
                        handleSendOtp={handleSendOtp}
                        handleOtpSubmit={handleOtpSubmit}
                        msg={msg}
                    />
                )}
                {activeLink === "tour-packages" && <TourSearchBar route={route} />}
                {activeLink === "group-tour" && <GroupSearchBar route={route} />}
            </div>
        </div>
    );
}

export default AdvancedSearchBar;


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

export function TourSearchBar({ route }) {
    const [formData, setFormData] = useState({
        tourFromTerm: "",
        destination: "",
        startDate: null,
        time: "",
        tourOption: "",
        phoneNumber: "",
        passanger: "1",
    });

    const tourOptions = [
        { value: "", label: "Select Tour" },
        { value: "Adventure", label: "Adventure" },
        { value: "Wildlife", label: "Wildlife" },
        { value: "Family Package", label: "Family Package" },
        { value: "Honeymoon Package", label: "Honeymoon Package" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => setFormData(prev => ({ ...prev, startDate: date }));

    const handleTourPackage = () => {
        const query = { ...formData, startDate: formData.startDate?.toISOString() };
        route("/tour", { state: query });
    };

    return (
        <>
            {["tourFromTerm", "destination"].map(field => (
                <div className={styles.radioOption} key={field}>
                    <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field === "tourFromTerm" ? "From" : "Destination"}
                        className={styles.searchInput}
                    />
                </div>
            ))}

            <div className={styles.radioOption}>
                <DatePicker
                    selected={formData.startDate}
                    onChange={handleDateChange}
                    placeholderText="Start Date"
                    className={styles.datePicker}
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={styles.timePicker}
                />
            </div>

            <div className={styles.radioOption}>
                <select
                    name="tourOption"
                    value={formData.tourOption}
                    onChange={handleChange}
                    className={styles.selectFilter}
                >
                    {tourOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="passanger"
                    value={formData.passanger}
                    min="1"
                    max="7"
                    onChange={handleChange}
                    placeholder="Passanger"
                    className={styles.searchInput}
                />
            </div>

            <div className="radio-option">
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="[0-9]+"
                    placeholder="Phone Number"
                    className={styles.searchInput}
                    required
                />
            </div>

            <button className={styles.searchButton} onClick={handleTourPackage}>
                <FaSearch />&nbsp;Search
            </button>
        </>
    );
}

export function GroupSearchBar({ route }) {
    const [tourOption, setTourOption] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const groupOptions = [
        { value: "", label: "Select Tour" },
        { value: "Adventure", label: "Adventure", models: ["Mountain", "Desert", "Ice"] },
        { value: "Wildlife", label: "Wildlife", models: ["Jungle Safari", "Rain Forest", "Zoo"] },
        { value: "Other", label: "Other" },
    ];

    const availbleModels = groupOptions.find(option => option.value === tourOption)?.models || [];

    const handleSelectChange = (e, setter) => setter(e.target.value);

    const handleGroupPackage = () => {
        const query = { tourOption, selectedModel };
        route("/group-tour", { state: query });
    };

    return (
        <>
            <div style={{ display: "flex", gap: "1rem", flexWrap: 'wrap', justifyContent: 'center' }}>
                <select
                    value={tourOption}
                    onChange={(e) => handleSelectChange(e, setTourOption)}
                    className={styles.selectFilter}
                >
                    {groupOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedModel}
                    onChange={(e) => handleSelectChange(e, setSelectedModel)}
                    disabled={!tourOption}
                    className={styles.selectFilter}
                >
                    <option value="">Select Location</option>
                    {availbleModels.map((model, index) => (
                        <option key={index} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>

            <button className={styles.searchButton} onClick={handleGroupPackage}>
                <FaSearch />&nbsp;Search
            </button>
        </>
    );
}
