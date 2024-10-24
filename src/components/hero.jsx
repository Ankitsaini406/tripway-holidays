import React, { useState, useEffect, useRef } from "react";
import AdvancedSearchBar from "./advanceserch";
import "../styles/components/hero.css";
import LazyLoadImage from "../utils/lazyLoadImage";

const Hero = () => {
    const images = [
        { src: 'https://images.unsplash.com/photo-1588356295620-3a53c9e50ba9?q=80&w=2670&auto=format&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1701523968149-e016f5473362?q=80&w=2670&auto=format&fit=crop' },
        { src: 'https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?q=80&w=2644&auto=format&fit=crop' },
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
        <div className="hero">
            <div className="hero-image-container">
                {images.map((image, i) => (
                    <LazyLoadImage
                        key={i}
                        className={`hero-image ${i === index ? "active" : ""} ${i === (index - 1 + images.length) % images.length ? "slide-out" : ""}`}
                        // data-src={image.src}
                        src={image.src}
                        alt={`Slide ${i + 1}`}
                        imageLength={images.length}
                    />
                ))}
            </div>
            <AdvancedSearchBar />
        </div>
    );
};

export default Hero;
