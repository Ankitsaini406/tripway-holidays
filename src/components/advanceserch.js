import React, { useState, useRef } from "react";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import { CabSearchBar } from "./cabSearchBar";
import { TourSearchBar } from "./tourSearchBar";
import { GroupSearchBar } from "./groupSearchBar";
import useSendEmail from "@/hook/useSendEmail";
import styles from '../styles/components/advancesearchbar.module.css';

function AdvancedSearchBar() {
    const [activeLink, setActiveLink] = useState("cabs");
    const [activeOtp, setActiveOtp] = useState(false);
    const [correctOtp, setCorrectOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const { sendEmail, loading, success } = useSendEmail();
    const emailRef = useRef();

    // Function to generate a 6-digit OTP
    const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const otp = generateOtp();
        setCorrectOtp(otp);
        setActiveOtp(true);

        // Prepare the email content
        const emailContent = {
            email: emailRef.current.value,
            subject: "Your OTP Code",
            message: `Your OTP code is: ${otp}`,
        };

        // Send email using the hook
        await sendEmail(emailContent);

        if (success) {
            alert('OTP sent successfully!');
        } else if (error) {
            alert('Failed to send OTP. Please try again.');
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
