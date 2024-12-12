"use client";

import React, { useState, useEffect } from "react";
import AdvancedSearchBar from "../advanceserch";
import HeroSlider from "./heroSlider";
import styles from "@/styles/components/hero.module.css";

const Hero = () => {
    const images = [
        { src: '/slider/slider1.0.jpg', width: 2670, height: 1500 },
        { src: '/slider/slider2.png', width: 2670, height: 1500 },
        { src: '/slider/slider3.png', width: 2670, height: 1500 },
        { src: '/slider/slider4.png', width: 2644, height: 1500 },
        { src: '/slider/slider5.png', width: 2644, height: 1500 },
        { src: '/slider/slider6.png', width: 2644, height: 1500 },
    ];

    const [activeTab, setActiveTab] = useState("cabs");
    const [isMobile, setIsMobile] = useState(false);

    // Check if the viewport is mobile-sized after mounting
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Calculate height based on active tab and viewport size
    const calculateHeight = () => {
        if (isMobile) {
            return activeTab === "cabs" ? "87vh" : "33vh";
        }
        return "87vh"; // Default for larger screens
    };

    return (
        <div
            className={styles.hero}
            style={{
                height: calculateHeight(),
                transition: "height 0.3s ease", // Smooth height change
            }}
        >
            <HeroSlider images={images} height={calculateHeight()} />
            <AdvancedSearchBar onTabChange={setActiveTab} />
        </div>
    );
};

export default Hero;
