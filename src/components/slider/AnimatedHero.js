import styles from "@/styles/components/hero.module.css";

export default function AnimatedHero() {
    return (
        <div className={styles.animatedHero}>
            <div className={styles.heroContent}>
                <h1>&quot;Your - Trusted Travel Partner&quot;</h1>
                <p>Connecting Destinations, Creating Memories!</p>
            </div>
        </div>
    );
}