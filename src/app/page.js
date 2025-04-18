import React from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
const TypeWriterLoop = dynamic(() => import("@/utils/typeWriter"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const DelayedComponent = dynamic(() => import("@/utils/DelayedComponent"));
import { TourSection, TourSectionWrapper, WhyBookUs } from "@/components/homeComponents";
import styles from "./page.module.css";
import AnimatedHero from "@/components/slider/AnimatedHero";

export const metadata = {
    title: "TripWay Holidays: Book One-way | Round Trip | Multi City | Group Tour",
    description: "Embark on a journey like never before with TripWay Holidays, your ultimate travel partner. Whether you're planning a one-way trip, a round-trip adventure, a multi-city exploration, or a memorable group tour, we have you covered. Discover the best tour packages tailored to your preferences. Experience seamless booking, personalized itineraries, and unmatched customer service. From picturesque landscapes to bustling cities, TripWay Holidays ensures that every journey is unforgettable. Book now and turn your travel dreams into reality.",
    keywords: [
        "Best Tours and Travels near me",
        "Near by tours and travels",
        "Any Travel agency near me",
        "Nearest travel agency",
        "Local travels near me",
    ],
    icons: {
        icon: "/favicon.ico",
    },
};

// ✅ Structured Data Definition
const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Tripway Holidays",
    "url": "https://tripwayholidays.in/",
    "logo": "https://tripwayholidays.in/favicon.ico",
    "description": "Tripway Holidays offers the best holiday packages, tours, and travel experiences.",
    "telephone": "+91-8890906400",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Opp. Mangal Trasport, Near Chandpool Gate",
        "addressLocality": "Sikar",
        "addressRegion": "Rajsthan",
        "postalCode": "332001",
        "addressCountry": "IN"
    },
    "sameAs": [
        "https://www.facebook.com/tripwayholidays",
        "https://www.instagram.com/tripwayholiday",
        "https://www.twitter.com/tripwayholidays",
        "https://www.youtube.com/@tripwayholidays",
        "https://x.com/tripwayholidays",
    ]
};

const fetchImageUrl = async () => {
    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    const response = await fetch(`${apiPoint}api/image-url`,
        // { cache: "no-store" }
    ); // No caching
    const data = await response.json();
    return data.imageUrl;
};

export default async function Home() {
    const imageUrl = await fetchImageUrl();

    const messages = ["One Way", "Round Trip", "Multi City", "Group Tour"];

    const tourData = [
        {
            id: "oneWay",
            title: "One Way",
            description: "Tripway Holidays offers convenient one-way travel services with a wide range of vehicles. Perfect for business trips or leisure travel booking is quick and easy. Our extensive network ensures smooth reservations across cities. Skilled drivers and well-maintained vehicles guarantee comfort and safety and an affordable travel experience.",
            imageSrc: "/slider/slider4.webp",
            link: "/cabs/one-way",
        },
        {
            id: "roundTrip",
            title: "Round Trip",
            description: "Tripway Holidays provides seamless round-trip services with a variety of vehicles at affordable prices. You can easily customize your schedule with flexible reservations across cities. Our extensive network, experienced drivers and well-maintained vehicles ensure a smooth, comfortable and reliable travel experience whether its for vacations, business trips or family outings.",
            imageSrc: "/slider/slider3.webp",
            link: "/cabs/round-trip",
        },
        {
            id: "multiCity",
            title: "Multi City Trip",
            description: "For those planning multi-city trips Tripway Holidays offers reliable and flexible services. You can hire a single vehicle for multiple destinations avoiding multiple bookings. Our fleet includes luxury SUVs and economy vehicles. With experienced drivers and well-maintained cars we guarantee safety, on-time arrivals and a hassle-free travel experience tailored to your itinerary and group size.",
            imageSrc: "/slider/slider2.webp",
            link: "/cabs/multi-city",
        },
        {
            id: "groupTour",
            title: "Group Tour",
            description: "Tripway Holidays offers group tours blending spirituality, culture, and exploration for unforgettable experiences. Embark on spiritual journeys fostering tranquility and connections, or dive into heritage tours exploring customs, art, and history. Enjoy Freedom Tours for flexibility and companionship, or celebrate vibrant festivals with Special Event Tours. Every trip combines joy, connection, and discovery, tailored to your interests and mood.",
            imageSrc: "/slider/slider6.webp",
            link: "/group-tour",
        },
    ];

    return (
        <>
            {/* ✅ Inject JSON-LD Structured Data */}
            <Script
                id="structured-data"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <AnimatedHero imageUrl={imageUrl} />

            <div className={styles.hadingBox}>
                <h2 className={styles.fixedText}>Lets Travel Together&nbsp;
                    <div className={styles.textBox}>
                        <TypeWriterLoop messages={messages} duration={3} />
                    </div>
                </h2>
            </div>

            <div className="layout">
                <TourSectionWrapper>
                    {tourData.map((tour, index) => (
                        <TourSection
                            key={tour.id}
                            index={index}
                            id={tour.id}
                            title={tour.title}
                            description={tour.description}
                            link={tour.link}
                        />
                    ))}
                </TourSectionWrapper>

                <DelayedComponent delay={1000} >
                    <WhyBookUs />
                    <Testimonials category='home' />
                </DelayedComponent>
            </div>
        </>
    );
};
