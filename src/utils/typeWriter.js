"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const TypeWriterLoop = ({ messages, duration = 5 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, duration * 1000);

        return () => clearInterval(interval);
    }, [messages, duration]);

    const currentMessage = messages[currentIndex];

    return (
        <div style={{ display: "inline-block", perspective: "1000px", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentMessage}
                    initial={{
                        opacity: 0,
                        y: "100%",
                        rotateX: 90,
                        scale: 0.8,
                        filter: "blur(4px)",
                        transformOrigin: "bottom",
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        filter: "blur(0px)",
                    }}
                    exit={{
                        opacity: 0,
                        y: "-100%",
                        rotateX: -60,
                        scale: 0.8,
                        filter: "blur(3px)",
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                    style={{
                        display: "inline-block",
                        willChange: "transform, opacity, filter",
                    }}
                >
                    {currentMessage}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default TypeWriterLoop;
