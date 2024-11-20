import React, { useState, useRef } from "react";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import { CabSearchBar } from "./cabSearchBar";
import { TourSearchBar } from "./tourSearchBar";
import { GroupSearchBar } from "./groupSearchBar";
import styles from '../styles/components/advancesearchbar.module.css';

function AdvancedSearchBar() {
    const [activeLink, setActiveLink] = useState("cabs");
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const emailRef = useRef();

    // Function to generate a 6-digit OTP
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        try {
            const response = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailRef.current.value, otp }),
            });
            if (response.status === 200) {
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
        setMsg(enteredOtp === correctOtp ? "✅ OTP Verified Successfully!" : "❌ Invalid OTP. Please try again.");
    };

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className={styles.selectionBox}>
            <ul className={styles.selectionList}>
                {["cabs", "tour-packages", "group-tour"].map((link) => (
                    <li key={link}>
                        <a
                            className={`${styles.searchSelectButton} ${activeLink === link ? styles.active : ""}`}
                            href={`#${link}`}
                            onClick={() => handleClick(link)}
                        >
                            <span className={styles.searchSpanIcons}>
                                {link === "cabs" && <PiCarProfileLight />}
                                {link === "tour-packages" && <MdCardTravel />}
                                {link === "group-tour" && <HiOutlineUserGroup />}
                            </span>
                            &nbsp;{link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, "")}
                        </a>
                    </li>
                ))}
            </ul>


            <div className={styles.advancedSearchBar}>
                {activeLink === "cabs" && (
                    <CabSearchBar
                        activeOtp={activeOtp}
                        correctOtp={correctOtp}
                        setEnteredOtp={setEnteredOtp}
                        emailRef={emailRef}
                        handleSendOtp={handleSendOtp}
                        handleOtpSubmit={handleOtpSubmit}
                        msg={msg}
                    />
                )}
                {activeLink === "tour-packages" && <TourSearchBar />}
                {activeLink === "group-tour" && <GroupSearchBar />}
            </div>
        </div>
    );
}

export default AdvancedSearchBar;
