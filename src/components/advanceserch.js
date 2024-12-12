"use client";

import React, { useState, useEffect } from "react";
import { PiCarProfileLight } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import { CabSearchBar } from "./cabSearchBar";
import { GroupSearchBar } from "./groupSearchBar";
import styles from '../styles/components/advancesearchbar.module.css';

function AdvancedSearchBar({ onTabChange }) {
    const [activeLink, setActiveLink] = useState("cabs");

    const handleClick = (link) => {
        setActiveLink(link);
        if (onTabChange) onTabChange(link); // Notify parent about the active tab
    };

    useEffect(() => {
        // Initial notify on mount
        if (onTabChange) onTabChange(activeLink);
    }, [activeLink, onTabChange]);

    return (
        <div className={styles.selectionBox}>
            <ul className={styles.selectionList}>
                {["cabs", "group"].map((link) => (
                    <li key={link}>
                        <a
                            className={`${styles.searchSelectButton} ${activeLink === link ? styles.active : ""}`}
                            href={`#${link}`}
                            onClick={() => handleClick(link)}
                        >
                            <span className={styles.searchSpanIcons}>
                                {link === "cabs" && <PiCarProfileLight />}
                                {link === "group" && <HiOutlineUserGroup />}
                            </span>
                            &nbsp;{link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, " ")}
                        </a>
                    </li>
                ))}
            </ul>

            <div className={styles.advancedSearchBar}>
                {activeLink === "cabs" && <CabSearchBar />}
                {activeLink === "group" && <GroupSearchBar />}
            </div>
        </div>
    );
}

export default AdvancedSearchBar;
