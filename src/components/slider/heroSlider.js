"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from '@/styles/components/hero.module.css';

const HeroSlider = ({ images }) => {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    return (
        <div className={styles.heroImageContainer}>
            {images.map((image, i) => (
                <div
                    key={i}
                    className={`${styles.heroImage} ${
                        i === index ? styles.active : ""
                    } ${
                        i === (index - 1 + images.length) % images.length
                            ? styles.slideOut
                            : ""
                    }`}
                >
                    <Image
                        className={styles.img}
                        data-src={image.src}
                        src={image.src}
                        alt={`Slide ${i + 1}`}
                        placeholder="blur"
                        blurDataURL={image.src}
                        width={1600}
                        height={900}
                        priority={i === 0} // High priority for the first image
                        loading={i !== 0 && i === 1 ? "eager" : undefined} // Eager loading for the second image, default for others
                    />
                </div>
            ))}
        </div>
    );
};

export default HeroSlider;
