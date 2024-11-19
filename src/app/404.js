import Link from "next/link";
import styles from "./404.module.css";

export default function Custom404() {
    return (
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <h1 className={styles.error}>404</h1>
            <p className={styles.message}>Oops! Page not found.</p>
            <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
                Return to Home
            </Link>
        </div>
    );
}
