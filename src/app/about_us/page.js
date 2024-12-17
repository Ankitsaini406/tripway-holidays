import React from "react";
import styles from "@/styles/pages/termsAndPrivacy.module.css";

export const metadata = {
    title: "TripWay Holidays - About Us",
    description: "Know More About Tripway Holidays",
};

function AboutPage() {

    return (
        <div className={styles.mainWidth}>
            <h1 className={styles.h1Tag}>About Us</h1>
            <p>
                Welcome to Tripwayholiday, your trusted travel partner dedicated to turning your travel dreams into reality. Whether you&apos;re planning a relaxing getaway, an adventurous group tour, or a well-planned multi-city journey, we&apos;ve got you covered. Founded by <strong>Sandeep Kumar Soni</strong>, TripWayHoliday is committed to providing exceptional travel experiences tailored to your preferences.
            </p>
            <p>
                At our core, we believe travel is more than just reaching a destination—it&apos;s about creating unforgettable memories, forging new connections, and discovering the beauty of the world around us.
            </p>

            <h2 className={styles.h2Tag}>Our Services</h2>
            <p>At TripwayHoliday, we offer a range of travel solutions designed to cater to all kinds of travelers:</p>

            <h3 className={styles.h3Tag}>Group Tours</h3>
            <p>Perfect for families, friends, or corporate groups looking to explore together. We organize tours that ensure comfort, fun, and bonding moments.</p>

            <h3 className={styles.h3Tag}>Multi-City Tours</h3>
            <p>Want to visit multiple destinations in one trip? We specialize in planning seamless multi-city itineraries, so you can enjoy the best each place has to offer.</p>

            <h3 className={styles.h3Tag}>One-Way Trips</h3>
            <p>Need a one-way travel solution? We provide hassle-free booking for one-way journeys to your destination.</p>

            <h3 className={styles.h3Tag}>Round Trips</h3>
            <p>Explore a destination and return with ease. Our round-trip services ensure a smooth journey from start to finish.</p>

            <p>Each of our services is backed by a dedicated team, ensuring that your travel plans are executed flawlessly.</p>

            <h2 className={styles.h2Tag}>Why Choose Us ?</h2>
            <h3>Personalized Travel Plans:</h3>
            <p>We understand that every traveler is unique, so we craft personalized itineraries to suit your preferences.</p>

            <h3 className={styles.h3Tag}>Affordable Pricing:</h3>
            <p>Enjoy premium travel experiences at competitive prices.</p>

            <h3 className={styles.h3Tag}>Expert Team:</h3>
            <p>With a passionate team of professionals, we&apos;re here to assist you every step of the way.</p>

            <h3 className={styles.h3Tag}>Seamless Booking Process:</h3>
            <p>From consultation to confirmation, we make your travel planning effortless.</p>

            <h3 className={styles.h3Tag}>Customer-Centric Approach:</h3>
            <p>Your satisfaction is our top priority.</p>

            <h3 className={styles.h3Tag}>Our Mission</h3>
            <p>At TripwayHoliday, our mission is to provide exceptional travel experiences that combine affordability, convenience, and adventure. We aim to inspire people to explore the world, connect with different cultures, and create memories that last a lifetime.</p>
            <p>Start Your Journey Today!</p>
            <p>Whether you&apos;re planning a quick getaway or an extended tour, TripwayHoliday is here to guide you every step of the way. Let us help you explore the world, one destination at a time.</p>
            <p>Contact us now and let&apos;s make your travel dreams come true!</p>
            <a className={styles.aTag} href="mailto:tripwayholiday@gmail.com">tripwayholiday@gmail.com</a>
        </div>
    );
}

export default AboutPage;
