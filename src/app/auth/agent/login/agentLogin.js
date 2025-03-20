'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { useClient } from "@/context/UserContext";
import styles from '@/styles/pages/authpage.module.css';
import Link from "next/link";
import OtpVerification from "@/utils/otpVeriification";
import { generateOtp, sendOtp } from "@/utils/Utils";

function AgentLoginPage({ setAgentLogin }) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aciveContainer, setActiveContainer] = useState(true);

    const { loginUser } = useClient();
    const router = useRouter();

    // const handleSendOtp = async (e) => {
    //     e.preventDefault();
    //     setError("");

    //     if (!phoneNumber || phoneNumber.length < 10) {
    //         setError("Enter a valid phone number.");
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         const generatedOtp = generateOtp();
    //         setOtp(generatedOtp);
    //         setShowOtpField(true);
    //         await sendOtp({ campaignName: "otplogin", phoneNumber, otp: generatedOtp });
    //     } catch (error) {
    //         setError("Failed to send OTP. Please try again.");
    //         console.error("Error sending OTP:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // OTP Verification
    // const handleVerifyOtp = () => {
    //     if (enteredOtp === otp) {
    //         setIsOtpVerified(true);
    //         setError("");
    //         handleLogin();
    //     } else {
    //         setError("Invalid OTP. Please try again.");
    //     }
    // };

    // Login Function
    const handleLogin = async () => {
        try {
            setLoading(true);
            const personExists = await loginUser(phoneNumber);
            if (!personExists) {
                setError("No user found with this number.");
                return;
            }
            router.push("/");
        } catch (error) {
            setError(error.message);
            console.error("Error during sign-in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.agentLogin}>
            <div className={styles.loginBlur}>
                <div className={`${styles.loginContainer} ${aciveContainer ? styles.activeCon : styles.closeCon}`}>
                    <div className={styles.loginCard}>
                        <Link
                            className={styles.backToWeb}
                            href="/"
                        >
                            <FaHome />
                        </Link>
                        <h1 className={styles.loginTitle}>Partner Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className={styles.formGroup}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    className={styles.authInput}
                                    type="tel"
                                    id="agent-phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number (e.g. +1 1234567890)"
                                    required
                                    disabled={showOtpField}
                                />
                            </div>
                            {error && <p className={styles.errorMessage}>{error}</p>}
                            {/* {!showOtpField && (
                                <button type="submit" className={loading ? 'loadingButton' : styles.loginButton} disabled={loading}>
                                    {loading ? <span className='loadingDots'>Sending OTP </span> : "Send OTP"}
                                </button>
                            )} */}
                        </form>

                        {/* {showOtpField && !isOtpVerified && (
                            <>
                                <OtpVerification
                                    numberOfDigits={6}
                                    setEnteredOtp={setEnteredOtp}
                                    handleSendOtp={handleSendOtp}
                                />
                                <button onClick={handleVerifyOtp} className={loading ? 'loadingButton' : styles.loginButton} disabled={loading}>
                                    {loading ? <span className='loadingDots'>Verifying </span> : "Verify OTP"}
                                </button>
                            </>
                        )} */}

                        {/* {isOtpVerified && ( */}
                            <button onClick={handleLogin} className={loading ? 'loadingButton' : styles.loginButton} disabled={loading}>
                                {loading ? <span className='loadingDots'>Logging in </span> : "Login"}
                            </button>
                        {/* )} */}

                        <p className={styles.signupLink}>
                            Don’t have an account? <Link href="/auth/agent/signup">Sign Up</Link>
                        </p>

                        <div className={styles.loginUrl}>
                            <Link href="/auth/user/login" className={styles.forgetPassword}>
                                User Login
                            </Link>
                            <Link href="/auth/driver/login" className={styles.forgetPassword}>
                                Driver Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentLoginPage;
