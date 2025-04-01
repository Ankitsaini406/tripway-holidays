import styles from "@/styles/components/hero.module.css";
import Image from "next/image";
import Link from "next/link";

export default function AnimatedHero({ imageUrl }) {
    return (
        <div className={styles.animatedHero}>
            {/* Background Image */}
            <Image className={styles.heroImg} src={imageUrl} alt="Banner Image" fill priority />

            {/* Text Content */}
            <div className={styles.heroContent}>
                <h1>&quot;Your - Trusted Travel Partner&quot;</h1>
                <p>Connecting Destinations, Creating Memories!</p>
            </div>

            {/* Buttons */}
            <div className={styles.allButton}>
                <Link className={styles.linksButton} href="/cabs/one-way">One Way</Link>
                <Link className={styles.linksButton} href="/cabs/round-trip">Round Trip</Link>
                <Link className={styles.linksButton} href="/cabs/multi-city">Multi City</Link>
                {/* <Link className={styles.linksButton} href="/group-tour">Group Tours</Link> */}
            </div>
        </div>
    );
}