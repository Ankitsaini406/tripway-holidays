import React, { useState, useEffect, useRef } from "react";
import AdvancedSearchBar from "./advanceserch";
import styles from '../styles/components/hero.module.css'; // Importing the CSS module
import LazyLoadImage from "@/utils/lazyLoadingImage";

const Hero = () => {
    const images = [
        { src: 'https://images.unsplash.com/photo-1588356295620-3a53c9e50ba9?q=80&w=2670&auto=format&fit=crop', width: 2670, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop', width: 2670, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1701523968149-e016f5473362?q=80&w=2670&auto=format&fit=crop', width: 2670, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?q=80&w=2644&auto=format&fit=crop', width: 2644, height: 1500 },
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
