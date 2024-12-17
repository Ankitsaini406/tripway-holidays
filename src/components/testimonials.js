'use client';

import { useState } from 'react';
import styles from '@/styles/components/testimonials.module.css';

const testimonials = [
    {
        name: "Parshant Jaat",
        text: "The team was highly professional, attentive, and ensured everything was perfect. Their commitment to quality and service left a lasting impression.",
        address: "New Delhi, India",
        stars: 4.5,
    },
    {
        name: "Rohit Jangir",
        text: "Exceptional service with great attention to detail. The professionalism and commitment displayed by the team exceeded all my expectations.",
        address: "Mumbai, India",
        stars: 3.5,
    },
    {
        name: "James Jone",
        text: "A fantastic experience with a team committed to customer satisfaction, bringing professionalism, creativity, and unmatched expertise to every interaction.",
        address: "Pune, India",
        stars: 5,
    },
    {
        name: "Amit Soni",
        text: "Professional, committed, and dedicated. The team ensures a smooth experience with attention to detail and a commitment to client satisfaction.",
        address: "Noida, India",
        stars: 3,
    },
    {
        name: "Shankar Sharma",
        text: "Exceptional dedication and passion. The team's commitment to delivering high-quality results and client support is truly impressive.",
        address: "Jaipur, India",
        stars: 4,
    },
];

function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(2);

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    const getPositionClass = (index) => {
        if (index === activeIndex) return styles.active;
        if (index === (activeIndex - 1 + testimonials.length) % testimonials.length)
            return styles.prev;
        if (index === (activeIndex + 1) % testimonials.length) return styles.next;
        return styles.hidden;
    };

    return (
        <div className={styles.testimonialMainBox}>
            <h2>Testimonials</h2>

            {/* Testimonials Slider */}
            <div className={styles.testimonialBoxFlex}>
                {testimonials.map(({ name, text, address, stars }, index) => (
                    <div
                        key={index}
                        className={`${styles.testimonialBox} ${getPositionClass(index)}`}
                    >
                        <span
                            style={{ '--rating-value': `${stars}` }}
                            className={styles.rating}
                        ></span>
                        <h4>{name}</h4>
                        <p>{text}</p>
                        <h4>{address}</h4>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className={styles.dots}>
                {testimonials.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${
                            index === activeIndex ? styles.activeDot : ''
                        }`}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
