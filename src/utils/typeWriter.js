'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const TypeWriterLoop = ({ messages, duration = 5 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const wordRef = useRef(null);
    const containerRef = useRef(null);

    const currentMessage = messages[currentIndex];

    useEffect(() => {
        const ctx = gsap.context(() => {
            requestAnimationFrame(() => {
                // Initial hidden state
                gsap.set(wordRef.current, {
                    opacity: 0,
                    yPercent: 100,
                    rotationX: 90,
                    scale: 0.8,
                    filter: 'blur(4px)',
                    transformOrigin: 'bottom',
                });

                const tl = gsap.timeline();

                // Animate in
                tl.to(wordRef.current, {
                    opacity: 1,
                    yPercent: 0,
                    rotationX: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                });

                // Animate out
                tl.to(
                    wordRef.current,
                    {
                        opacity: 0,
                        yPercent: -100,
                        rotationX: -60,
                        scale: 0.8,
                        filter: 'blur(3px)',
                        duration: 0.6,
                        ease: 'power2.in',
                    },
                    `+=${duration - 1.2}`
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [currentIndex, duration]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, duration * 1000);

        return () => clearInterval(interval);
    }, [messages, duration]);

    return (
        <div ref={containerRef}>
            <span ref={wordRef}>
                {currentMessage}
            </span>
        </div>
    );
};

export default TypeWriterLoop;
