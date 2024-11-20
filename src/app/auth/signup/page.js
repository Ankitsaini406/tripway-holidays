'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useClient } from "@/context/UserContext";
import styles from "@/styles/pages/authpage.module.css";

function SignUpPage() {
    const [isHovered, setIsHovered] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const { signupUserWithEmailAndPassword } = useClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !name || !phoneNumber) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== verifyPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await signupUserWithEmailAndPassword(email, password, { name, phoneNumber, verifyPassword }, 'users');
            router.push("/");
        } catch (err) {
            setError("Failed to sign up. Please try again.");
            console.error(err);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleVerifyPasswordVisibility = () => {
        setShowVerifyPassword(!showVerifyPassword);
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
                        <h2 className={styles.loginTitle}>Sign Up</h2>
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
                                <input
                                    className={styles.authInput}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]+"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your Phone Number"
                                    required
                                />
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
