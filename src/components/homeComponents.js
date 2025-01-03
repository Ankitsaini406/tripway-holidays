// app/components/TourSection.js
import Image from "next/image";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/app/page.module.css";

export const TourSection = ({ id, title, description, imageSrc, blurDataURL, error }) => {
    if (error) {
        return (
            <div className={styles.errorBox}>
                <p>{error}</p>
            </div>
        );
    }

    return (
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
                        src={imageSrc} // Path to the public folder image
                        alt={title}
                        placeholder="blur"
                        blurDataURL={imageSrc} // Pass the blurDataURL for image placeholder
                        width={600}
                        height={600}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};


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
