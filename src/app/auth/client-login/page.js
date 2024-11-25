'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AgentLogin from "../agent-login/page";
import ForgetPassword from "@/utils/forgetPassword";
import { FaHome } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useClient } from "@/context/UserContext";
import styles from '@/styles/pages/authpage.module.css';
import Link from "next/link";

function ClientLoaginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeContainer, setActiveContainer] = useState(true);
    const [agentLogin, setAgentLogin] = useState(false);
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
            const personExists = await loginUser(email, password, 'users');
            if (!personExists) {
                setError("No user found with this email.");
                return;
            }

            router.push("/");
        } catch (error) {
            setError(error.message); // Display the error message
            console.error("Error during sign-in:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {agentLogin ?
                <AgentLogin
                    setAgentLogin={setAgentLogin}
                    setActiveContainer={setActiveContainer}
                    activeContainer={activeContainer}
                />
                : <div className={styles.loginPage}>
                    <div className={styles.loginBlur}>
                        <div className={`${styles.loginContainer} ${activeContainer ? styles.activeCon : styles.closeCon}`}>
                            <div className={styles.loginCard}>
                                <Link
                                    className={styles.backToWeb}
                                    href="/"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <FaHome />
                                    &nbsp;
                                    {isHovered && <span className={styles.tooltipText}>Home</span>}
                                </Link>
                                <h2 className={styles.loginTitle}>Client Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            className={styles.authInput}
                                            type="email"
                                            id="client-email"
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
                                    <p
                                        className={styles.forgetPassword}
                                        onClick={() => setActiveContainer(false)}
                                    >
                                        Forget Password
                                    </p>
                                    {error && <p className={styles.errorMessage}>{error}</p>}
                                    <button type="submit" className={styles.loginButton}>
                                        Login
                                    </button>
                                </form>
                                <p className={styles.signupLink}>
                                    Don’t have an account? <a href="/auth/signup">Sign Up</a>
                                </p>
                                <a
                                    href="/auth/agent-login"
                                    className={styles.forgetPassword}
                                    onClick={() => setAgentLogin(true)}
                                >
                                    Agent Login
                                </a>
                            </div>
                        </div>
                        <ForgetPassword
                            activeContainer={activeContainer}
                            setActiveContainer={setActiveContainer}
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default ClientLoaginPage;
