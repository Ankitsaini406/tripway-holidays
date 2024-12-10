import React from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import Image from "next/image";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "./page.module.css";

export const metadata = {
    title: "TripWay Holidays",
    description: "Book Tour Next Tripway Holidays",
};

const Home = () => {
    return (
        <>
            <div className="layout">
                <Hero />

                <div className={styles.hadingBox}>
                    <h1>Lets Travel Together with TripWay Holidays!</h1>
                </div>

                <div className={styles.homeTour} id="oneWay">
                    <div className={styles.homeTourFlex}>
                        <div>
                            <h2>One Way</h2>
                            <p>
                                Tripway Holidays offers convenient one-way travel services with a wide range of vehicles. Perfect for business trips or leisure travel booking is quick and easy. Our extensive network ensures smooth reservations across cities. Skilled drivers and well-maintained vehicles guarantee comfort and safety and an affordable travel experience.
                            </p>
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

                <div className={styles.homeTour} id="roundTrip">
                    <div className={styles.homeTourFlex}>
                        <div>
                            <h2>Round Trip</h2>
                            <p>
                                Tripway Holidays provides seamless round-trip services with a variety of vehicles at affordable prices. You can easily customize your schedule with flexible reservations across cities. Our extensive network, experienced drivers and well-maintained vehicles ensure a smooth, comfortable and reliable travel experience whether it's for vacations, business trips or family outings.
                            </p>
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

                <div className={styles.homeTour} id="multiCity">
                    <div className={styles.homeTourFlex}>
                        <div>
                            <h2>Multi City Trip</h2>
                            <p>
                                For those planning multi-city trips Tripway Holidays offers reliable and flexible services. You can hire a single vehicle for multiple destinations avoiding multiple bookings. Our fleet includes luxury SUVs and economy vehicles. With experienced drivers and well-maintained cars we guarantee safety, on-time arrivals and a hassle-free travel experience tailored to your itinerary and group size.
                            </p>
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

                <div className={styles.homeTour} id="groupTour">
                    <div className={styles.homeTourFlex}>
                        <div>
                            <h2>Group Tours</h2>
                            <p>
                                Tripway Holidays creates group excursions that blend spirituality, exploration and cultural learning to provide life-changing travel experiences. Set out on a spiritual adventure that promotes inner tranquility and deep relationships with other travelers who share your interests. Explore our heritage excursions which create a vibrant cultural tapestry by delving into the depths of customs, art and history.
                                Our Freedom Tours offer the ideal mix of independence and group support for tourists looking for flexibility and companionship. If you want excitement our Special Event Tours guarantee treasured moments by celebrating vibrant festivals, impressive performances and distinctive get-togethers.
                                Every group tour offered by Tripway Holidays is designed to provide a well-balanced combination of joy, connection and discovery making each trip unique and customized to fit your interests and mood.
                            </p>
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
            </div>
        </>
    );
};

export default Home;
