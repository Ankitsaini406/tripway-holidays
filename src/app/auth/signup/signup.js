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
    const [countryCode, setCountryCode] = useState("+91");
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState("");

    const { signupUserWithEmailAndPassword } = useClient();

    useEffect(() => {
        // Fetch country data
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                const countryList = data
                    .map((country) => ({
                        name: country.name.common,
                        code: country.idd?.root
                            ? country.idd.root + (country.idd.suffixes?.[0] || "")
                            : "",
                        flag: country.flag, // Unicode flag (🏴)
                    }))
                    .filter((country) => country.code); // Remove empty codes

                setCountries(countryList);
            })
            .catch((error) => console.error("Error fetching country codes:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !name || !phoneNumber) {
            setError("Please fill in all fields.");
            return;
        }

        // if (password !== verifyPassword) {
        //     setError("Passwords do not match.");
        //     return;
        // }

        try {
            const allData = { name, countryCode, phoneNumber, address, role: 'User' }
            await signupUserWithEmailAndPassword(email, phoneNumber, allData, 'users');
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            console.error(err);
        }
    };

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    // const toggleVerifyPasswordVisibility = () => {
    //     setShowVerifyPassword(!showVerifyPassword);
    // };

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
                                    <select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                        className={styles.countrySelect}
                                    >
                                        {countries.map((country, index) => (
                                            <option key={index} value={country.code}>
                                                {country.name} ({country.code})
                                            </option>
                                        ))}
                                    </select>
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
                            {/* <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <div className={styles.inputIcon}>
                                    <input
                                        className={styles.authInput}
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggleBtn}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <MdOutlineVisibilityOff />
                                        ) : (
                                            <MdOutlineVisibility />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="verifyPassword">Verify Password</label>
                                <div className={styles.inputIcon}>
                                    <input
                                        className={styles.authInput}
                                        type={showVerifyPassword ? "text" : "password"}
                                        id="verifyPassword"
                                        value={verifyPassword}
                                        onChange={(e) => setVerifyPassword(e.target.value)}
                                        placeholder="Enter your password again"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggleBtn}
                                        onClick={toggleVerifyPasswordVisibility}
                                    >
                                        {showVerifyPassword ? (
                                            <MdOutlineVisibilityOff />
                                        ) : (
                                            <MdOutlineVisibility />
                                        )}
                                    </button>
                                </div>
                            </div> */}
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
