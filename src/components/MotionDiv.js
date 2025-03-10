"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/components/ScrollableCards.module.css";

const cardData = [
    { id: 1, title: "Card 1", color: "#FF5733" },
    { id: 2, title: "Card 2", color: "#33FF57" },
    { id: 3, title: "Card 3", color: "#5733FF" },
    { id: 4, title: "Card 4", color: "#FF33A1" },
    { id: 5, title: "Card 5", color: "#33A1FF" },
];

const ScrollableCards = () => {
    const containerRef = useRef(null);
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const scrollTop = window.scrollY;
            const cardHeight = window.innerHeight * 0.8;
            const index = Math.min(
                Math.floor(scrollTop / cardHeight),
                cardData.length - 1
            );
            setVisibleIndex(index);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="layout">
        <div className={styles.mainScroll} ref={containerRef}>
            <h1 className={styles.cardStick}>Tour Details</h1>
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
                        </div>
                    )
                })}
            </div>
        </div>
                </div>
    );
};

export default ScrollableCards;
