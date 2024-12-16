import React from "react";
import Link from "next/link";
import Hero from "@/components/slider/hero";
import Image from "next/image";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import TypeWriterLoop from "@/utils/typeWriter";
import styles from "./page.module.css";

export const metadata = {
    title: "TripWayHoliday: Book One-way | Group Tour | Multi City",
    description: "Experience the world with TripWayHoliday. Book One-way, Round Trip, Multi City and Group Tours. Find the best deal.",
};

const Home = () => {

    const messages = ["One Way", "Round Trip", "Multi City", "Group Tour"];

    const tourData = [
        {
            id: "oneWay",
            title: "One Way",
            description: "Tripway Holidays offers convenient one-way travel services with a wide range of vehicles. Perfect for business trips or leisure travel booking is quick and easy. Our extensive network ensures smooth reservations across cities. Skilled drivers and well-maintained vehicles guarantee comfort and safety and an affordable travel experience.",
            imageSrc: "/slider/slider6.webp",
        },
        {
            id: "roundTrip",
            title: "Round Trip",
            description: "Tripway Holidays provides seamless round-trip services with a variety of vehicles at affordable prices. You can easily customize your schedule with flexible reservations across cities. Our extensive network, experienced drivers and well-maintained vehicles ensure a smooth, comfortable and reliable travel experience whether its for vacations, business trips or family outings.",
            imageSrc: "/slider/slider6.webp",
        },
        {
            id: "multiCity",
            title: "Multi City Trip",
            description: "For those planning multi-city trips Tripway Holidays offers reliable and flexible services. You can hire a single vehicle for multiple destinations avoiding multiple bookings. Our fleet includes luxury SUVs and economy vehicles. With experienced drivers and well-maintained cars we guarantee safety, on-time arrivals and a hassle-free travel experience tailored to your itinerary and group size.",
            imageSrc: "/slider/slider6.webp",
        },
    ];

    return (
        <>
            <div className="layout">
                <Hero />

                <div className={styles.hadingBox}>
                    <h1 className={styles.fixedText}>Lets Travel Together&nbsp;
                        <div className={styles.textBox}>
                            <TypeWriterLoop messages={messages} duration={3} />
                        </div>
                    </h1>
                </div>

                {tourData.map((tour) => (
                <TourSection
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    description={tour.description}
                    imageSrc={tour.imageSrc}
                />
            ))}

                <div className={styles.homeTour} id="groupTour">
                    <div className={styles.homeTourFlex}>
                        <div className={styles.scrollRevel}>
                            <h2> <span>Group Tours</span></h2>
                            <p><span>
                                Tripway Holidays creates group excursions that blend spirituality, exploration and cultural learning to provide life-changing travel experiences. Set out on a spiritual adventure that promotes inner tranquility and deep relationships with other travelers who share your interests. Explore our heritage excursions which create a vibrant cultural tapestry by delving into the depths of customs, art and history.
                                Our Freedom Tours offer the ideal mix of independence and group support for tourists looking for flexibility and companionship. If you want excitement our Special Event Tours guarantee treasured moments by celebrating vibrant festivals, impressive performances and distinctive get-togethers.
                                Every group tour offered by Tripway Holidays is designed to provide a well-balanced combination of joy, connection and discovery making each trip unique and customized to fit your interests and mood.
                                </span>
                            </p>
                            <Link className='readMore' href='/group-tour'>Read More</Link>
                        </div>
                        <div className={styles.imgBox}>
                            <Image
                                className={styles.tourImg}
                                data-src='/slider/slider6.webp'
                                src='/slider/slider6.webp'
                                alt="multicolored-buntings"
                                placeholder="blur"
                                blurDataURL='/slider/slider6.webp'
                                width={600}
                                height={600}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
                <WhyBookUs />
            </div>
        </>
    );
};

export default Home;

export const TourSection = ({ id, title, description, imageSrc }) => (
    <div className={styles.homeTour} id={id}>
        <div className={styles.homeTourFlex}>
            <div className={styles.scrollRevel}>
                <h2><span>{title}</span></h2>
                <p><span>{description}</span></p>
            </div>
            <div className={styles.imgBox}>
                <Image
                    title={title}
                    className={styles.tourImg}
                    src={imageSrc}
                    alt={title}
                    placeholder="blur"
                    blurDataURL={imageSrc}
                    width={600}
                    height={600}
                    loading="lazy"
                />
            </div>
        </div>
    </div>
);

export function WhyBookUs() {
    return (
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
    )
}
