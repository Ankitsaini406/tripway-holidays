import React from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import Image from "next/image";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import PopUp from "@/utils/popUp";
import styles from "./page.module.css";

export const metadata = {
    title: "TripWay Holidays",
    description: "Book Tour Next Tripway Holidays",
};

const Home = () => {
    return (
        <>
            {/* <PopUp title='New Pop' content='This is Pop up' popTime={5000} closeTime={10000} />
        <PopUp title='New Pop' content='This is Pop up' popTime={15000} closeTime={20000} /> */}
            <div className='layout'>
                <Hero />

                <div className={styles.homeTour} id="groupTour">
                    <div className={styles.homeTourFlex}>
                        <div>
                            <h2>Group Tours</h2>
                            <p>At Tripway Holidays, we craft group tours that blend exploration, spirituality, and cultural discovery, creating unforgettable experiences for every traveler. Imagine embarking on a spiritual journey that inspires inner peace, where harmonious clusters of like-minded travelers share moments of reflection and connection. Our heritage tours delve into the heart of traditions, art, and history, offering a rich tapestry of cultural wonders. With our Freedom Tours, we provide the perfect mix of independence and camaraderie, allowing you to explore destinations with flexibility while enjoying the company of a supportive group. For those seeking excitement, our Special Event Tours celebrate vibrant festivals, grand concerts, and unique gatherings, turning every moment into a cherished memory. At Tripway Holidays, we ensure every journey is a balance of discovery, connection, and joy, designed to resonate with your spirit.</p>
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
                            <div className={styles.icons}><PiTrainLight /></div>
                            <h2>Easy Booking</h2>
                            <p className={styles.whyText}>We offer easy and convenient bus booking with attractive offers.</p>
                        </div>
                        <div className={styles.whyBox}>
                            <div className={styles.icons}><IoPricetagOutline /></div>
                            <h2>Lowest Price</h2>
                            <p className={styles.whyText}>We ensure low rates on hotel reservation, holiday packages and on bus tickets.</p>
                        </div>
                        <div className={styles.whyBox}>
                            <div className={styles.icons}><BiSolidOffer /></div>
                            <h2>Exciting Deals</h2>
                            <p className={styles.whyText}>Enjoy exciting deals on buses, hotel, car rental and tour packages.</p>
                        </div>
                        <div className={styles.whyBox}>
                            <div className={styles.icons}><BiSupport /></div>
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
