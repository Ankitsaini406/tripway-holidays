
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import styles from '../styles/components/advancesearchbar.module.css';

export function TourSearchBar() {

    const route = useRouter();

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
        route.push("/tour", { state: query });
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