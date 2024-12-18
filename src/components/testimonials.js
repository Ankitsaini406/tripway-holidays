'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/components/testimonials.module.css';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(2);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            setError(null);

            try {
                const testimonialsRef = collection(firestore, 'testimonials');

                const testimonialsQuery = query(
                    testimonialsRef,
                    orderBy('createdAt', 'desc'),
                    limit(5)
                );

                const querySnapshot = await getDocs(testimonialsQuery);

                const testimonialsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setTestimonials(testimonialsData);
            } catch (fetchError) {
                console.error('Error fetching testimonials:', fetchError);
                setError('Failed to load testimonials. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 430);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

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
            {
                loading ? (
                    <div className={styles.shimmerContainer}>
                        {Array.from({ length: isMobile ? 1 : 3 }).map((_, index) => (
                            <div key={index} className={styles.shimmerBox}></div>
                        ))}
                    </div>
                ) : error ? <p>{error}</p> : <div className={styles.testimonialBoxFlex}>
                    {testimonials.map(({ name, text, address, stars }, index) => (
                        <div
                            key={index}
                            className={`${styles.testimonialBox} ${getPositionClass(index)}`}
                        >
                            <span
                                style={{ '--rating-value': `${stars || 0}` }}
                                className={styles.rating}
                            ></span>
                            <h4>{name || 'Anonymous'}</h4>
                            <p>{text || 'No review available.'}</p>
                            <h4>{address || 'Unknown location'}</h4>
                        </div>
                    ))}
                </div>
            }

            {/* Navigation Dots */}
            <div className={styles.dots}>
                {testimonials.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''
                            }`}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
