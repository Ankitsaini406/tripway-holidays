import React, { useState, useEffect, useRef } from "react";
import AdvancedSearchBar from "./advanceserch";
import styles from '../styles/components/hero.module.css'; // Importing the CSS module
import Image from "next/image";

const Hero = () => {
    const images = [
        { src: '/slider/slider1.0.jpg', width: 2670, height: 1500 },
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
                    <div key={i} className={`${styles.heroImage} ${i === index ? styles.active : ""} ${i === (index - 1 + images.length) % images.length ? styles.slideOut : ""}`}>
                        <Image
                            className={styles.img}
                            data-src={image.src}
                            src={image.src}
                            alt={`Slide ${i + 1}`}
                            placeholder="blur"
                            blurDataURL={image.src}
                            layout="intrinsic"
                            width={1600}
                            height={900}
                        />
                    </div>
                ))}
            </div>
            <AdvancedSearchBar className={styles.advancedSearchBar} />
        </div>
    );
};

export default Hero;
