
import styles from "@/styles/pages/cabs.module.css";

export default function WhyChooseUs({title, description, whyChooseUs }) {
    return (
        <div className={styles.mainBox}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.whyBook}>
            {
                whyChooseUs.map((item, index) => (
                    <div key={index} className={styles.whyBox}>
                    <div className={styles.icons}>{item.icons}</div>
                    <h3>{item.title}</h3>
                    <p className={styles.whyText}>
                        {item.description}
                    </p>
                </div>
                ))
            }
        </div>
    </div>
    )
}