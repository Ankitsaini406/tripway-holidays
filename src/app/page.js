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

                <div className={styles.hadingBox}>
                    <h1>Let’s Travel Together with TripWay Holidays!</h1>
                </div>
                <>
                    <div className={styles.homeTour} id="oneWay">
                        <div className={styles.homeTourFlex}>
                            <div>
                                <h2>One Way</h2>
                                <p>Tripway Holidays provides easy and reasonably priced one-way travel services using vehicles and taxis, perfect for pleasure excursions, business travel, or hassle-free transportation to your destination. With a wide range of vehicles, including hatchbacks, SUVs, and luxury automobiles, to meet the demands of any traveler, our vast network makes it easy to make reservations throughout cities and towns.
                                    Experienced drivers who know the local routes and drive well-maintained cars guarantee comfort and safety. Selecting a vehicle, picking your pickup and drop-off locations, and confirming in a matter of minutes makes booking quick and easy. With Tripway Holidays, you only pay for the distance you go, which makes your trip affordable and stress-free!</p>
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
                                <p>Tripway Holidays provides dependable round-trip transportation options, including vehicles and taxis, making it ideal for getaways, business meetings, and family vacations. Travelers returning to their starting location can make flexible reservations thanks to our network's numerous city coverage.
                                    To meet your demands, a variety of sedans, SUVs, and luxury vehicles are available at affordable costs. Professional drivers with knowledge on a variety of routes and well-maintained cars guarantee comfort and safety."<br></br>
                                    Simply enter your locations, select your vehicle, and personalize your schedule to make a quick and easy reservation on our website. Take advantage of hassle-free round-trip travel with Tripway Holidays, where we put your satisfaction first!</p>
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
                                <p>For those who want to visit several places in one trip, Tripway Holidays provides dependable and adaptable multi-city trip services. Our service guarantees a flawless experience whether it's an adventure, family holiday, or business tour.
                                    Avoid the trouble of making numerous reservations by hiring a single taxi for all of your destinations. Depending on the size and requirements of your group, select from our large fleet of automobiles, which includes luxury cars, SUVs, and economy cars."<br></br>
                                    Our expert drivers and well-kept cars guarantee comfort, safety, and on-time arrivals. Just provide us your itinerary, and we'll take care of the rest. Traveling between cities is made simple with Tripway Holidays!</p>
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
                                <p>Tripway Holidays creates group excursions that blend spirituality, exploration, and cultural learning to provide life-changing travel experiences. Set out on a spiritual adventure that promotes inner tranquility and deep relationships with other travelers who share your interests. Explore our heritage excursions, which create a vibrant cultural tapestry by delving into the depths of customs, art, and history.
                                    Our Freedom Tours offer the ideal mix of independence and group support for tourists looking for flexibility and companionship. If you want excitement, our Special Event Tours guarantee treasured moments by celebrating vibrant festivals, impressive performances, and distinctive get-togethers.
                                    Every group tour offered by Tripway Holidays is designed to provide a well-balanced combination of joy, connection, and discovery, making each trip unique and customized to fit your interests and mood.</p>
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
                        <h2>Why book with Tripway Holidays ?</h2>
                        <div className={styles.whyBook}>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><PiTrainLight /></div>
                                <h3>Easy Booking</h3>
                                <p className={styles.whyText}>We offer easy and convenient bus booking with attractive offers.</p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><IoPricetagOutline /></div>
                                <h3>Lowest Price</h3>
                                <p className={styles.whyText}>We ensure low rates on hotel reservation, holiday packages and on bus tickets.</p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiSolidOffer /></div>
                                <h3>Exciting Deals</h3>
                                <p className={styles.whyText}>Enjoy exciting deals on buses, hotel, car rental and tour packages.</p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiSupport /></div>
                                <h3>24/7 Support</h3>
                                <p className={styles.whyText}>Get assistance 24/7 on any kind of travel related query. We are happy to assist you.</p>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default Home;
