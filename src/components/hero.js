import React, { useState, useEffect, useRef } from "react";
import AdvancedSearchBar from "./advanceserch";
import styles from '../styles/components/hero.module.css'; // Importing the CSS module
import LazyLoadImage from "@/utils/lazyLoadingImage";

const Hero = () => {
    const images = [
        { src: '/slider/slider1.png', width: 2670, height: 1500 },
        { src: '/slider/slider2.png', width: 2670, height: 1500 },
        { src: '/slider/slider3.png', width: 2670, height: 1500 },
        { src: '/slider/slider4.png', width: 2644, height: 1500 },
        { src: '/slider/slider5.png', width: 2644, height: 1500 },
        { src: '/slider/slider6.png', width: 2644, height: 1500 },
    ];

    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    return (
        <div className={styles.hero}>
            <div className={styles.heroImageContainer}>
                {images.map((image, i) => (
                    <LazyLoadImage
                        key={i}
                        className={`${styles.heroImage} ${i === index ? styles.active : ""} ${i === (index - 1 + images.length) % images.length ? styles.slideOut : ""}`}
                        src={image.src}
                        alt={`Slide ${i + 1}`}
                        width={image.width}
                        height={image.height}
                        imageLength={images.length}
                    />
                ))}
            </div>
            <AdvancedSearchBar className={styles.advancedSearchBar} />
        </div>
    );
};

export default Hero;
