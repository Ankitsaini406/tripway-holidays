import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
const Video = dynamic(() => import("@/components/slider/video"));
const TypeWriterLoop = dynamic(() => import("@/utils/typeWriter"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const DelayedComponent = dynamic(() => import("@/utils/DelayedComponent"));
import { TourSection, WhyBookUs } from "@/components/homeComponents";
import styles from "./page.module.css";
import PopUp from "@/utils/popUp";

export const metadata = {
    title: "TripWay Holidays: Book One-way | Group Tour | Multi City",
    description: "Embark on a journey like never before with TripWay Holidays, your ultimate travel partner. Whether you're planning a one-way trip, a round-trip adventure, a multi-city exploration, or a memorable group tour, we have you covered. Discover the best tour packages tailored to your preferences. Experience seamless booking, personalized itineraries, and unmatched customer service. From picturesque landscapes to bustling cities, TripWay Holidays ensures that every journey is unforgettable. Book now and turn your travel dreams into reality.",
};


const Home = () => {

    const messages = ["One Way", "Round Trip", "Multi City", "Group Tour"];

    const tourData = [
        {
            id: "oneWay",
            title: "One Way",
            description: "Tripway Holidays offers convenient one-way travel services with a wide range of vehicles. Perfect for business trips or leisure travel booking is quick and easy. Our extensive network ensures smooth reservations across cities. Skilled drivers and well-maintained vehicles guarantee comfort and safety and an affordable travel experience.",
            imageSrc: "/slider/slider4.webp",
        },
        {
            id: "roundTrip",
            title: "Round Trip",
            description: "Tripway Holidays provides seamless round-trip services with a variety of vehicles at affordable prices. You can easily customize your schedule with flexible reservations across cities. Our extensive network, experienced drivers and well-maintained vehicles ensure a smooth, comfortable and reliable travel experience whether its for vacations, business trips or family outings.",
            imageSrc: "/slider/slider3.webp",
        },
        {
            id: "multiCity",
            title: "Multi City Trip",
            description: "For those planning multi-city trips Tripway Holidays offers reliable and flexible services. You can hire a single vehicle for multiple destinations avoiding multiple bookings. Our fleet includes luxury SUVs and economy vehicles. With experienced drivers and well-maintained cars we guarantee safety, on-time arrivals and a hassle-free travel experience tailored to your itinerary and group size.",
            imageSrc: "/slider/slider2.webp",
        },
    ];

    return (
        <>
        <PopUp popTime={10000} closeTime={15000} src="/popup/lucky-image.webp" alt="Lucky Draw Image" />
            {/* <Hero /> */}
            <Video />

            <div className={styles.hadingBox}>
                <h1 className={styles.fixedText}>Lets Travel Together&nbsp;
                    <div className={styles.textBox}>
                        <TypeWriterLoop messages={messages} duration={3} />
                    </div>
                </h1>
            </div>

            <div className="layout">
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
                                Tripway Holidays offers group tours blending spirituality, culture, and exploration for unforgettable experiences. Embark on spiritual journeys fostering tranquility and connections, or dive into heritage tours exploring customs, art, and history. Enjoy Freedom Tours for flexibility and companionship, or celebrate vibrant festivals with Special Event Tours. Every trip combines joy, connection, and discovery, tailored to your interests and mood.
                            </span>
                            </p>
                            <Link className='readMore' href='/group-tour'>Read More</Link>
                        </div>
                        <div className={styles.imgBox}>
                            <Image
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.tourImg}
                                data-src={`/slider/slider6.webp`}
                                src={`/slider/slider6.webp`}
                                alt="multicolored-buntings"
                                placeholder="blur"
                                blurDataURL={`/slider/slider6.webp`}
                                loading="lazy"
                                fill
                            />
                        </div>
                    </div>
                </div>
                <DelayedComponent delay={1000} >
                    <WhyBookUs />
                    <Testimonials />
                </DelayedComponent>
            </div>
        </>
    );
};

export default Home;
