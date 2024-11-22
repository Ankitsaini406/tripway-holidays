import React, { useState, useRef } from "react";
import { PiCarProfileLight } from "react-icons/pi";
import { MdCardTravel } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import "react-datepicker/dist/react-datepicker.css";
import { CabSearchBar } from "./cabSearchBar";
import { GroupSearchBar } from "./groupSearchBar";
import styles from '../styles/components/advancesearchbar.module.css';

function AdvancedSearchBar() {
    const [activeLink, setActiveLink] = useState("cabs");

    const handleClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className={styles.selectionBox}>
            <ul className={styles.selectionList}>
                {["cabs", "group-tour"].map((link) => (
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
                    <CabSearchBar />
                )}
                {activeLink === "group-tour" && <GroupSearchBar />}
            </div>
        </div>
    );
}

export default AdvancedSearchBar;
