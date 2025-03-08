'use client';

import React, { useState, useEffect } from "react";
import AdvancedSearchBar from "../advanceserch";
import styles from "@/styles/components/hero.module.css";

const Video = () => {
    const [activeTab, setActiveTab] = useState("cabs");
    const [isMobile, setIsMobile] = useState(false);

    // Check if the viewport is mobile-sized after mounting
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 430);
        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Calculate height based on active tab and viewport size
    const height = isMobile && activeTab !== "cabs" ? "35vh" : "88vh";

    return (
        <div
            className={styles.hero}
            style={{
                height,
                transition: "height 0.3s ease",
            }}
        >
            <div className={styles.heroImageContainer}>
                <video className={styles.video} autoPlay muted loop playsInline>
                    <source src="/video/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            {/* <AdvancedSearchBar onTabChange={setActiveTab} /> */}
        </div>
    );
};

export default Video;
