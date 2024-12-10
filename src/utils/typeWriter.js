'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitTextJS from "split-text-js";

const TypeWriterLoop = ({ messages, duration = 5 }) => {
    const textRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (textRef.current) {
            // Split the current text into characters
            const splitText = new SplitTextJS(textRef.current, { type: "chars" });
            const chars = splitText.chars;

            // GSAP animation timeline
            const tl = gsap.timeline({
                onComplete: () => {
                    splitText.revert(); // Clean up split text after animation
                },
            });

            tl.from(chars, {
                opacity: 0,
                y: 80,
                rotateX: -90,
                stagger: 0.1,
                ease: "power2.out",
            })
                .to(chars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.1,
                    ease: "power2.in",
                })
                .to(chars, {
                    opacity: 0,
                    y: -80,
                    rotateX: 90,
                    stagger: 0.1,
                    ease: "power2.in",
                }, `+=${duration - 2}`); // Add delay for display time

            return () => tl.kill(); // Cleanup on component unmount
        }
    }, [currentIndex]);

    useEffect(() => {
        // Update the current index at regular intervals
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, duration * 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [messages, duration]);

    return (
        <span ref={textRef} style={{ display: "inline-block" }}>
            {messages[currentIndex]}
        </span>
    );
};

export default TypeWriterLoop;
