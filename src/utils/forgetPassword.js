'use client';

import React, { useState } from "react";
import OtpVerification from "./otpVeriification";
import styles from '@/styles/pages/authpage.module.css';

function ForgetPassword({ activeContainer, setActiveContainer }) {
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [msg, setMsg] = useState('');
    const [enteredOtp, setEnteredOtp] = useState("");

    // Function to generate a 6-digit OTP
    const generateOtp = () => {
        const range = '0123456789';
        let otpVal = '';
        for (let i = 0; i < 6; i++) {
            otpVal += range[Math.floor(Math.random() * 10)];
        }
        return otpVal;
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);
        console.log(`Generated OTP: ${otp}`);

        const email = e.target.elements.email.value;

        try {
            const response = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            if (response.ok) {
                alert('OTP sent successfully!');
            } else {
                alert('Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('An error occurred.');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (enteredOtp === correctOtp) {
            setMsg("✅ OTP Verified Successfully!");
        } else {
            setMsg("❌ Invalid OTP. Please try again.");
        }
    };

    return (
        <div
            className={`${styles.loginContainer} ${
                activeContainer ? `${styles.closeCon}` : `${styles.activeCon}`
            }`}
        >
            <div className={styles.forgetCard}>
                <h2 className={styles.loginTitle}>Forget Password</h2>
                <form onSubmit={activeOtp ? handleOtpSubmit : handleSendOtp}>
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
                    {activeOtp && (
                        <div className={styles.formGroup}>
                            <label htmlFor="otp">OTP</label>
                            <OtpVerification
                                numberOfDigits={6}
                                correctOtp={correctOtp}
                                setEnteredOtp={setEnteredOtp}
                            />
                        </div>
                    )}
                    {msg && <p className={styles.errorMessage}>{msg}</p>}
                    <button type="submit" className={styles.loginButton}>
                        {activeOtp ? "Submit" : "Send OTP"}
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
