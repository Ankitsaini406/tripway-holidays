"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/app/page.module.css";
import Link from "next/link";

export const TourSection = ({ id, index, title, description, link }) => {
    const isEven = index % 2 === 0;
    const sectionRef = useRef();
    const inView = useInView(sectionRef, { once: true });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <motion.div
            ref={sectionRef}
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={styles.homeTour}
            id={id}
            data-tour-section
        >
            <div
                className={styles.homeTourFlex}
                style={{ flexDirection: isEven ? "row" : "row-reverse" }}
            >
                <div className={styles.scrollRevel}>
                    <h3><span>{title}</span></h3>
                    <p><span>{description}</span></p>
                    <Link className="readMore" href={link}>
                        {id === "groupTour" ? "Explore Tours" : "Book Now"}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export function TourSectionWrapper({ children }) {
    const containerRef = useRef(null);
    const pathRef = useRef(null);
    const [path, setPath] = useState("");
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"],
    });

    const generatePath = () => {
        const container = containerRef.current;
        if (!container) return;

        const sections = container.querySelectorAll("[data-tour-section]");
        const points = [];
        const containerWidth = container.offsetWidth;

        sections.forEach((section, idx) => {
            const y = section.offsetTop + section.offsetHeight / 2;
            const x = idx % 2 === 0 ? containerWidth : 0;
            points.push({ x, y });
        });

        if (points.length === 0) return;

        let d = `M ${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const midY = (prev.y + curr.y) / 2;
            d += ` C ${prev.x},${midY} ${curr.x},${midY} ${curr.x},${curr.y}`;
        }

        setPath(d);
    };

    useEffect(() => {
        generatePath(); // initial generation

        const resizeObserver = new ResizeObserver(() => {
            const container = containerRef.current;
            if (container) {
                setDimensions({
                    width: container.offsetWidth,
                    height: container.scrollHeight,
                });
                generatePath();
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [children]);

    return (
        <div ref={containerRef} className={styles.wrapper}>
            <svg
                className={styles.curveSvg}
                width="100%"
                height={dimensions.height}
                preserveAspectRatio="none"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >
                <motion.path
                    ref={pathRef}
                    d={path}
                    fill="none"
                    stroke="#FF9933"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    style={{ pathLength: scrollYProgress }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </svg>

            {children}
        </div>
    );
}

export function WhyBookUs() {
    return (
        <div className={styles.mainBox}>
            <h2>Why Book with Tripway Holidays?</h2>
            <div className={styles.whyBook}>
                <div className={styles.whyBox}>
                    <div className={styles.icons}><PiTrainLight /></div>
                    <h3>Easy Booking</h3>
                    <p className={styles.whyText}>
                        We offer quick and hassle-free booking with attractive offers and a user-friendly interface.
                    </p>
                </div>
                <div className={styles.whyBox}>
                    <div className={styles.icons}><IoPricetagOutline /></div>
                    <h3>Lowest Price</h3>
                    <p className={styles.whyText}>
                        Enjoy affordable rates for hotels, buses, tours and holiday packages.
                    </p>
                </div>
                <div className={styles.whyBox}>
                    <div className={styles.icons}><BiSolidOffer /></div>
                    <h3>Exciting Deals</h3>
                    <p className={styles.whyText}>
                        Avail deals on buses, hotels, car rentals and tour packages with exclusive offers.
                    </p>
                </div>
                <div className={styles.whyBox}>
                    <div className={styles.icons}><BiSupport /></div>
                    <h3>24/7 Support</h3>
                    <p className={styles.whyText}>
                        Get round-the-clock assistance for any travel queries. We are here to help.
                    </p>
                </div>
            </div>
        </div>
    )
}
