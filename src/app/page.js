'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import Image from "next/image";
import styles from "./page.module.css";
import PopUp from "@/utils/popUp";

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
        <>
            {/* <PopUp title='New Pop' content='This is Pop up' popTime={5000} closeTime={10000} />
        <PopUp title='New Pop' content='This is Pop up' popTime={15000} closeTime={20000} /> */}
            <div className='layout'>
                <Hero />

                <div className={styles.homeTour} id="groupTour">
                    <div className={styles.homeTourFlex}>
                        <div>
                            <h4>Group Travel</h4>
                            <p>This is for testing purposes</p>
                            <Link className='readMore' href='/group-tour'>Read More</Link>
                        </div>
                        <div className={`lazyImageWrapper ${styles.tourImg}`}>
                            <Image
                                className={styles.tourImg}
                                data-src='https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop'
                                src='https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop'
                                alt="multicolored-buntings"
                                placeholder="blur"
                                blurDataURL='https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop'
                                layout="intrinsic"
                                width={1600}
                                height={900}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
