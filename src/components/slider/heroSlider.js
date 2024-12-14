"use client";

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "@/styles/components/hero.module.css";

const HeroSlider = ({ images, height }) => {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (images.length > 0) {
            intervalRef.current = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 3000);
        }
        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    const handlePause = () => clearInterval(intervalRef.current);
    const handleResume = () =>
        (intervalRef.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000));

    if (!images || images.length === 0) {
        return <div className={styles.heroImageContainer}>No images available</div>;
    }

    return (
        <div
            className={styles.heroImageContainer}
            onMouseEnter={handlePause}
            onMouseLeave={handleResume}
            style={{
                height,
                transition: "height 0.3s ease",
            }}
        >
            {images.map((image, i) => (
                <div
                    key={i}
                    className={`${styles.heroImage} ${
                        i === index ? styles.active : ""
                    }`}
                    aria-hidden={i !== index}
                >
                    <Image
                        title={`Slide ${i + 1}`}
                        alt={`Slide ${i + 1}`}
                        src={image.src}
                        placeholder={i === 0 ? "blur" : "empty"}
                        blurDataURL={i === 0 ? image.src : undefined}
                        width={1600}
                        height={900}
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                        }}
                        priority={i === 0 && index === 0}
                        loading={i === 0 ? "eager" : "lazy"}
                    />
                </div>
            ))}
        </div>
    );
};

HeroSlider.defaultProps = {
    images: [],
    height: "400px",
};

HeroSlider.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
        })
    ).isRequired,
    height: PropTypes.string,
};

export default HeroSlider;
