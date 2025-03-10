'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useClient } from "@/context/UserContext";
import styles from "@/styles/pages/authpage.module.css";

const DriverSignup = () => {
    const [formData, setFormData] = useState({
        name: "", countryCode: "", phoneNumber: "", email: "", address: "",
        carNumber: "", driverLicence: "", driverRc: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { createNewUser } = useClient();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, countryCode, phoneNumber, email, address } = formData;

        if (!name || !countryCode || !phoneNumber || !email || !address) {
            return setError("Please fill in all fields.");
        }

        try {
            setLoading(true);
            const allData = { ...formData, role: 'Driver' };
            await createNewUser(allData);
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            setLoading(false);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupCustomer}>
            <div className={styles.loginBlur}>
                <div className={styles.loginContainer} style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                    <div className={styles.loginCard}>
                        <Link className={styles.backToWeb} href="/">
                            <FaHome />
                        </Link>
                        <h1 className={styles.loginTitle}>Driver Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            {[
                                "name", "email", "address", "carNumber", "driverLicence", "driverRc"
                            ].map((field) => (
                                <div className={styles.formGroup} key={field}>
                                    <label htmlFor={field}>
                                        {field.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    <input
                                        className={styles.authInput}
                                        type="text"
                                        id={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1").trim()}`}
                                        required
                                    />
                                </div>
                            ))}
                            <div className={styles.formGroup}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <div className={styles.inputContainer}>
                                    <input
                                        style={{ width: "20%" }}
                                        type="tel"
                                        id="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                        placeholder="+91"
                                        className={styles.countrySelect}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter your Phone Number"
                                        className={styles.phoneInput}
                                        required
                                    />
                                </div>
                            </div>
                            {error && <p className={styles.errorMessage}>{error}</p>}
                            <p className={styles.signupLink}>
                                Back to <Link href="/auth/driver/login">Log In</Link>
                            </p>
                            <button type="submit" className={loading ? 'loadingButton' : styles.loginButton}>
                                {loading ? <span className='loadingDots'>Loading </span> : "Sign Up"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverSignup;
