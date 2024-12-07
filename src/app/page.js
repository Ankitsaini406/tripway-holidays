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
                            <h2>Group Travel</h2>
                            <p>This is for testing purposes</p>
                            <Link className='readMore' href='/group-tour'>Read More</Link>
                        </div>
                        <div className={styles.imgBox}>
                            <Image
                                className={styles.tourImg}
                                data-src='/slider/slider6.png'
                                src='/slider/slider6.png'
                                alt="multicolored-buntings"
                                placeholder="blur"
                                blurDataURL='/slider/slider6.png'
                                width={1600}
                                height={900}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.mainBox}>
                    <h1>Why book with us?</h1>
                    <div className={styles.whyBook}>
                        <div className={styles.whyBox}>
                            <h2>Easy Booking</h2>
                            <p className={styles.whyText}>We offer easy and convenient bus booking with attractive offers.</p>
                        </div>
                        <div className={styles.whyBox}>
                            <h2>Lowest Price</h2>
                            <p className={styles.whyText}>We ensure low rates on hotel reservation, holiday packages and on bus tickets.</p>
                        </div>
                        <div className={styles.whyBox}>
                            <h2>Exciting Deals</h2>
                            <p className={styles.whyText}>Enjoy exciting deals on buses, hotel, car rental and tour packages.</p>
                        </div>
                        <div className={styles.whyBox}>
                            <h2>24/7 Support</h2>
                            <p className={styles.whyText}>Get assistance 24/7 on any kind of travel related query. We are happy to assist you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
