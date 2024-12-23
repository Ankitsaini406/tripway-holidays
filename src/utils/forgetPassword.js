'use client';

import React, { useState } from "react";
import styles from '@/styles/pages/authpage.module.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

function ForgetPassword({ activeContainer, setActiveContainer }) {
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;

        try {
            await sendPasswordResetEmail(auth, email);
            setMsg("✅ Email send successfully!");
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMsg("❌ Invalid Email. Please try again.");
        }
    };

    return (
        <div
            className={`${styles.loginContainer} ${activeContainer ? `${styles.closeCon}` : `${styles.activeCon}`
                }`}
        >
            <div className={styles.forgetCard}>
                <h2 className={styles.loginTitle}>Forget Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            className={styles.authInput}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    {msg && <p className={styles.errorMessage}>{msg}</p>}
                    <button type="submit" className={styles.loginButton}>
                        Submit
                    </button>
                </form>
                <p
                    className={styles.forgetPassword}
                    onClick={() => setActiveContainer(true)}
                >
                    Back to Login
                </p>
            </div>
        </div>
    );
}

export default ForgetPassword;
