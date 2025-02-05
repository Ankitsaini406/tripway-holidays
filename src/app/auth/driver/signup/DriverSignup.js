'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useClient } from "@/context/UserContext";
import styles from "@/styles/pages/authpage.module.css";

const DriverSignup = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "", phoneNumber: "", email: "", address: "",
        carNumber: "", driverLicence: "", driverRc: "",
        password: "", verifyPassword: ""
    });
    const [error, setError] = useState("");

    const { signupUserWithEmailAndPassword } = useClient();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, phoneNumber, email, address, password, verifyPassword } = formData;

        if (!name || !phoneNumber || !email || !address || !password) {
            return setError("Please fill in all fields.");
        }

        if (password !== verifyPassword) {
            return setError("Passwords do not match.");
        }

        try {
            const allData = {...formData, role: 'Driver'}
            await signupUserWithEmailAndPassword(email, password, allData, 'users');
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className={styles.signupCustomer}>
            <div className={styles.loginBlur}>
                <div className={styles.loginContainer} style={{ maxHeight: '80vh', overflowY: 'scroll'}}>
                    <div className={styles.loginCard} >
                        <Link className={styles.backToWeb} href="/"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <FaHome /> {isHovered && <span className={styles.tooltipText}>Home</span>}
                        </Link>

                        <h1 className={styles.loginTitle}>Driver Sign Up</h1>

                        <form onSubmit={handleSubmit}>
                            {["name", "phoneNumber", "email", "address", "carNumber", "driverLicence", "driverRc"].map((field) => (
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

                            {["password", "verifyPassword"].map((field, index) => (
                                <div className={styles.formGroup} key={field}>
                                    <label htmlFor={field}>{index === 0 ? "Password" : "Verify Password"}</label>
                                    <div className={styles.inputIcon}>
                                        <input
                                            className={styles.authInput}
                                            type={field === "password" ? (showPassword ? "text" : "password") : (showVerifyPassword ? "text" : "password")}
                                            id={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            placeholder={index === 0 ? "Enter your password" : "Confirm your password"}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.passwordToggleBtn}
                                            onClick={() => field === "password" ? setShowPassword(!showPassword) : setShowVerifyPassword(!showVerifyPassword)}
                                        >
                                            {field === "password"
                                                ? (showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />)
                                                : (showVerifyPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />)}
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {error && <p className={styles.errorMessage}>{error}</p>}

                            <p className={styles.signupLink}>
                                Back to <Link href="/auth/driver/login">Log In</Link>
                            </p>

                            <button type="submit" className={styles.loginButton}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverSignup;
