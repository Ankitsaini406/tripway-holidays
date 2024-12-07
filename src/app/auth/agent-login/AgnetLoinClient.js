'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useClient } from "@/context/UserContext";
import styles from "@/styles/pages/authpage.module.css";

function AgentLoginClient({ setAgentLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
            const personExists = await loginUser(email, password, 'agents');
            if (!personExists) {
                setError("No agent found with this email.");
                return;
            }

            router.push("/");
        } catch (error) {
            setError("An unknown error occurred.");
            console.error("Error during sign-in:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                Login
            </button>
            <button
                type="button"
                className={styles.forgetPassword}
                onClick={() => setAgentLogin(false)}
            >
                Client Login
            </button>
        </form>
    );
}

export default AgentLoginClient;
