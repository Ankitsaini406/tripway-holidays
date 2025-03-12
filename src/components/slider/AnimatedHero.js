import styles from "@/styles/components/hero.module.css";
import Link from "next/link";

export default function AnimatedHero() {
    return (
        <div className={styles.animatedHero}>
            <div className={styles.heroContent}>
                <h1>&quot;Your - Trusted Travel Partner&quot;</h1>
                <p>Connecting Destinations, Creating Memories!</p>
            </div>

            <div className={styles.allButton}>
                <Link className={styles.linksButton} href="/cabs/one-way">One Way</Link>
                <Link className={styles.linksButton} href="/cabs/round-trip">Round Trip</Link>
                <Link className={styles.linksButton} href="/cabs/multi-city">Multi City</Link>
                <Link className={styles.linksButton} href="/group-tour">Group Tours</Link>
            </div>
        </div>
    );
}