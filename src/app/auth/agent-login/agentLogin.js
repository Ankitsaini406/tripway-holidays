'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useClient } from "@/context/UserContext";
import styles from "@/styles/pages/authpage.module.css";

function AgentLoginPage({ setAgentLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [aciveContainer, setActiveContainer] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser } = useClient();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const personExists = await loginUser(email, password);
            if (!personExists) {
                setError("No agent found with this email.");
                return;
            }

            router.push("/profile");
        } catch (error) {
            setError("An unknown error occurred.");
            console.error("Error during sign-in:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.agentLogin}>
            <div className={styles.loginBlur}>
                <div className={`${styles.loginContainer} ${aciveContainer ? styles.activeCon : styles.closeCon}`}>
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
                        <h1 className={styles.loginTitle}>Partner Login</h1>
                        <form onSubmit={handleSubmit} style={{ margin: "0 0 1em 0" }}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    className={styles.authInput}
                                    type="email"
                                    id="agent-email"
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
                            {error && <p className={styles.errorMessage}>{error}</p>}
                            <button type="submit" className={styles.loginButton}>
                                Sign In
                            </button>
                        </form>
                        <Link
                            href="/auth/client-login"
                            className={styles.forgetPassword}
                            onClick={() => setAgentLogin(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentLoginPage;
