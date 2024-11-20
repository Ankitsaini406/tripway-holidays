import React, { useState, useEffect, useRef } from "react";
import styles from '@/styles/pages/authpage.module.css';

export function OtpVerification({ numberOfDigits, setEnteredOtp }) {
    const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
    const otpBoxReference = useRef([]);
    const [otpTimer, setOtpTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    useEffect(() => {
        let timer;
        if (isTimerActive && otpTimer > 0) {
            timer = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setIsTimerActive(false); // Stop the timer when it reaches zero
        }

        return () => clearInterval(timer); // Cleanup
    }, [isTimerActive, otpTimer]);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setEnteredOtp(newOtp.join(""));

        if (value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    };

    const handleBackspaceAndEnter = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus();
        }
        if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    };

    const handleResendOtp = () => {
        if (!isTimerActive) {
            console.log("OTP Resent");
            setOtpTimer(30); // Reset the timer to 30 seconds
            setIsTimerActive(true); // Start the timer
        }
    };

    return (
        <article>
            <div className={styles.otpBox}>
                {otp.map((digit, index) => (
                    <input
                        className={styles.authOtp}
                        key={index}
                        value={digit}
                        maxLength={1}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                        ref={(ref) => (otpBoxReference.current[index] = ref)}
                    />
                ))}
            </div>
            {isTimerActive ? (
                <p>Resend OTP in {otpTimer} seconds</p>
            ) : (
                <button onClick={handleResendOtp} className={styles.resendOtpButton}>
                    Resend OTP
                </button>
            )}
        </article>
    );
}

export default OtpVerification;
