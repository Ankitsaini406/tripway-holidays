'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import LazyLoadImage from "@/utils/lazyLoadingImage";
import styles from "./page.module.css";

const Home = () => {
    const imageRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                if (isIntersecting) {
                    target.src = target.dataset.src;
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.1 });

        imageRefs.current.forEach((img) => img && observer.observe(img));

        return () => observer.disconnect();
    }, []);

    return (
        <div className='layout'>
            <Hero />

            <div className={styles.homeTour} id="tourSection">
                <div className={styles.homeTourFlex}>
                    <LazyLoadImage
                        ref={(el) => (imageRefs.current[0] = el)}
                        className={styles.tourImg}
                        src="https://images.unsplash.com/photo-1704774041066-ffefb6e950fd?q=80&w=2536&auto=format&fit=crop"
                        alt="a-small-green-building-in-the-middle-of-a-forest"
                        data-src="https://images.unsplash.com/photo-1704774041066-ffefb6e950fd?q=80&w=2536&auto=format&fit=crop"
                    />
                    <div>
                        <h4>Tour Travel</h4>
                        <p>This is for testing purposes</p>
                        <Link className='readMore' href='/tour/tours'>Read More</Link>
                    </div>
                </div>
            </div>

            <div className={styles.homeTour} id="groupTour">
                <div className={styles.homeTourFlex}>
                    <div>
                        <h4>Group Travel</h4>
                        <p>This is for testing purposes</p>
                        <Link className='readMore' href='/tour/group-tours'>Read More</Link>
                    </div>
                    <LazyLoadImage
                        ref={(el) => (imageRefs.current[1] = el)}
                        className={styles.tourImg}
                        src="https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop"
                        alt="multicolored-buntings"
                        data-src="https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
