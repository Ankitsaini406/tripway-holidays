'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
// import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useClient } from "@/context/UserContext";
import styles from "@/styles/pages/authpage.module.css";

function SignUpPage() {
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [error, setError] = useState("");

    const { createNewUser } = useClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !name || !phoneNumber) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const allData = { name, email, countryCode, phoneNumber, address, role: 'User' }
            await createNewUser(allData);
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className={styles.signupCustomer}>
            <div className={styles.loginBlur}>
                <div className={styles.loginContainer}>
                    <div className={styles.loginCard}>
                        <Link
                            className={styles.backToWeb}
                            href="/"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <FaHome />&nbsp;
                            {isHovered && <span className={styles.tooltipText}>Home</span>}
                        </Link>
                        <h1 className={styles.loginTitle}>Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input
                                    className={styles.authInput}
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your Name"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <div className={styles.inputContainer}>
                                    <input
                                        style={{ width: "20%" }}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\+[0-9]*"
                                        id="countryCode"
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        placeholder="+91"
                                        className={styles.countrySelect}
                                        required
                                    />
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]+"
                                        id="phoneNumber"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter your Phone Number"
                                        className={styles.phoneInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    className={styles.authInput}
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Address</label>
                                <input
                                    className={styles.authInput}
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your Address"
                                    required
                                />
                            </div>
                            {error && <p className={styles.errorMessage}>{error}</p>}
                            <button type="submit" className={styles.loginButton}>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
