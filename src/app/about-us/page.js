import styles from "@/styles/pages/termsAndPrivacy.module.css";

export const metadata = {
    title: "About Us",
    description:
        "Learn more about Tripway Holidays — your trusted travel partner offering group tours, multi-city adventures, and personalized itineraries across India.",
    keywords: [
        "About Tripway Holidays",
        "Travel Company India",
        "Group Tours",
        "Multi-City Tours",
        "One-Way Trips",
        "Round Trips",
        "Customized Travel Plans",
        "Affordable Travel Services",
        "Ankit Saini",
    ],
    openGraph: {
        title: "About Us",
        description:
            "Discover Tripway Holidays - delivering seamless travel experiences, customized itineraries, and affordable round trips across destinations.",
        url: "https://tripwayholidays.in/about-us",
        type: "website",
        // images: [
        //     {
        //         url: "/about-us-banner.jpg",
        //         width: 1200,
        //         height: 630,
        //         alt: "Tripway Holidays About Us Banner",
        //     },
        // ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Tripway Holidays",
        description:
            "Explore how Tripway Holidays is redefining travel with expert planning, group tours, and custom itineraries.",
        // images: ["/about-us-banner.jpg"],
    },
};

export default function AboutPage() {
    return (
        <div className={styles.mainWidth}>
            <header>
                <h1 className={styles.h1Tag}>About Us</h1>
                <p>
                    Welcome to <strong>Tripway Holidays</strong>, your dedicated travel
                    partner committed to turning your travel dreams into reality. Whether
                    you&apos;re planning a relaxing getaway, a group adventure, or a multi-city
                    journey, we’re here for you. Co-founded by <strong>Ankit Saini</strong>,
                    we’re passionate about delivering unforgettable travel experiences
                    tailored to your preferences.
                </p>
                <p>
                    Travel isn’t just about reaching a destination — it’s about creating
                    lifelong memories, meeting new people, and discovering the world’s
                    beauty.
                </p>
            </header>

            <section>
                <h2 className={styles.h2Tag}>Our Services</h2>
                <p>
                    We offer flexible and value-packed travel options designed to match
                    your unique needs:
                </p>

                <article>
                    <h3 className={styles.h3Tag}>Group Tours</h3>
                    <p>
                        Enjoy shared adventures with families, friends, or colleagues.
                        Expect comfort, joy, and unforgettable group bonding.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>Multi-City Tours</h3>
                    <p>
                        Experience multiple destinations in one journey. Our seamless
                        planning ensures you make the most of every stop.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>One-Way Trips</h3>
                    <p>
                        Need a one-way ticket? We provide reliable and simple booking
                        solutions tailored for one-direction travel.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>Round Trips</h3>
                    <p>
                        Travel out and return stress-free. Our round-trip options keep your
                        journey smooth from start to finish.
                    </p>
                </article>

                <p>
                    Each service is powered by our expert travel team, ensuring precision
                    and care in your itinerary.
                </p>
            </section>

            <section>
                <h2 className={styles.h2Tag}>Why Choose Us?</h2>
                <article>
                    <h3>Personalized Travel Plans</h3>
                    <p>
                        We customize every trip based on your goals, whether you&apos;re seeking
                        adventure, relaxation, or cultural immersion.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>Affordable Pricing</h3>
                    <p>
                        Get premium travel experiences without breaking the bank — our plans
                        are designed to offer maximum value.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>Expert Team</h3>
                    <p>
                        Our passionate team ensures every step of your travel is handled
                        professionally and with care.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>Seamless Booking Process</h3>
                    <p>
                        From consultation to confirmation, we offer a stress-free booking
                        experience.
                    </p>
                </article>

                <article>
                    <h3 className={styles.h3Tag}>Customer-Centric Approach</h3>
                    <p>
                        Your satisfaction is our mission. Every detail is crafted with your
                        comfort in mind.
                    </p>
                </article>
            </section>

            <section>
                <h2 className={styles.h2Tag}>Our Mission</h2>
                <p>
                    At Tripway Holidays, our mission is to create affordable, inspiring,
                    and memorable travel experiences that bring people closer to the
                    world. We aim to connect cultures and enrich lives through the magic
                    of travel.
                </p>
                <p>
                    Start your journey today — whether it&apos;s a weekend getaway or a
                    full-fledged tour, we&apos;re here to plan every moment. Let us take you
                    places.
                </p>
            </section>

            <footer>
                <p>
                    Contact us at{" "}
                    <a className={styles.aTag} href="mailto:tripwayholiday@gmail.com">
                        tripwayholiday@gmail.com
                    </a>{" "}
                    and let’s plan your next adventure!
                </p>
            </footer>
        </div>
    );
}
