"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/app/page.module.css";
import Link from "next/link";

export const TourSection = ({ id, index, title, description, link }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={styles.homeTour} id={id} data-tour-section>
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
        </div>
    );
};

gsap.registerPlugin(ScrollTrigger);
export function TourSectionWrapper({ children }) {
    const [containerWidth, setContainerWidth] = useState(0); // State to hold container width
    const [containerHeight, setContainerHeight] = useState(0); // State to hold container height
    const pathRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Handle resizing of container dynamically
        const resizeObserver = new ResizeObserver(() => {
            const container = containerRef.current;
            if (container) {
                setContainerWidth(container.offsetWidth);  // Update width
                setContainerHeight(container.offsetHeight); // Update height
            }
        });

        const container = containerRef.current;
        if (container) {
            setContainerWidth(container.offsetWidth);
            setContainerHeight(container.offsetHeight);
            resizeObserver.observe(container);
        }

        return () => resizeObserver.disconnect(); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const path = pathRef.current;
        const container = containerRef.current;
        if (!path || !container) return;

        const sections = container.querySelectorAll("[data-tour-section]");
        const points = [];

        // Ensure we have container size
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;

        sections.forEach((section, idx) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Alternating positions starting from the right
            const x = idx % 2 === 0 ? containerWidth : 0;
            const y = sectionTop + sectionHeight / 2;

            points.push({ x, y });
        });

        if (points.length === 0) return;

        // Build smooth path
        let d = `M ${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const midY = (prev.y + curr.y) / 2;
            d += ` C ${prev.x},${midY} ${curr.x},${midY} ${curr.x},${curr.y}`;
        }

        path.setAttribute("d", d);

        const length = path.getTotalLength();
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });

        gsap.to(path, {
            strokeDashoffset: 0,
            scrollTrigger: {
                trigger: container,
                start: "top center",
                end: "bottom end",
                scrub: 1,
            },
        });
    }, [containerWidth, containerHeight]); // Re-run when container size changes

    return (
        <div className={styles.wrapper} ref={containerRef}>
            <svg
                className={styles.curveSvg}
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                viewBox={`0 0 ${containerWidth} ${containerHeight}`} // Dynamically set viewBox based on container size
            >
                <path
                    ref={pathRef}
                    fill="none"
                    stroke="#FF9933"
                    strokeLinecap="round"
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
