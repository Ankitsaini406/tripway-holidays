"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const splashVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: "easeInOut" } },
};

const nameVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence initial={false}>
            {isVisible && (
                <motion.div
                    className="splashScreen"
                    variants={splashVariants}
                    initial="initial"
                    animate="initial"
                    exit="exit"
                    style={{ willChange: "opacity, transform" }}
                >
                    <motion.div
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                        style={{ willChange: "opacity, transform" }}
                    >
                        <Image
                            src="/favicon-512.png"
                            alt="Tripway Holidays"
                            width={120}
                            height={120}
                            priority
                        />
                    </motion.div>
                    <motion.h1
                        variants={nameVariants}
                        initial="initial"
                        animate="animate"
                        style={{ willChange: "opacity, transform" }}
                    >
                        Tripway Holidays
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
