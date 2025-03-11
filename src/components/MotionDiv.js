"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/ScrollableCards.module.css";

const cardData = [
    { id: 1, title: "Explore New Destinations", subtitle: "Discover hidden gems around the world.", color: "var(--indigo-blue)" },
    { id: 2, title: "Adventure Awaits!", subtitle: "Embark on thrilling experiences.", color: "var(--safforn-orange)" },
    { id: 3, title: "Luxury & Comfort", subtitle: "Stay in top-rated hotels & resorts.", color: "#5733FF" },
    { id: 4, title: "Cultural Journeys", subtitle: "Experience the traditions of new places.", color: "#FF33A1" },
    { id: 5, title: "Memorable Moments", subtitle: "Create stories that last a lifetime.", color: "#33A1FF" },
];

const ScrollableCards = () => {
    const containerRef = useRef(null);
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndex((prevIndex) => (prevIndex + 1) % cardData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.mainColor}>
            <div className="layout">
                <div className={styles.mainScroll} ref={containerRef}>
                    <h1 className={styles.cardStick}>
                    <div className={styles.ctaSection}>
                        <h1 className={styles.ctaText}>&quot;Your Trusted travel Partner&quot;</h1>
                        <button className={styles.ctaButton}>Book Now</button>
                    </div>
                    </h1>
                    <div className={styles.scrollContainer}>
                        {cardData.map((card, index) => {
                            const isPast = index < visibleIndex;
                            return (
                                <div
                                    key={card.id}
                                    className={`${styles.card} ${visibleIndex === index ? styles.active : isPast ? styles.past : ""}`}
                                    style={{
                                        backgroundColor: card.color,
                                        zIndex: cardData.length - index,
                                        transform: `translate(-50%, -50%) rotate(${index * -10}deg)`,
                                    }}
                                >
                                    <h3>{card.title}</h3>
                                    <h4>{card.subtitle}</h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollableCards;
