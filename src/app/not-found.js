'use client';

import Link from 'next/link';
import styles from '@/styles/pages/not-found.module.css';

export default function NotFoundPage() {
    return (
        <div className={styles.notFound}>
            <div className={styles.animationContainer}>
                <div className={styles.movingPlane}></div>
                <h1 className={styles.title}>Lost in Paradise?</h1>
                <p className={styles.message}>
                    It seems the page you are looking for does not exist. Let is get you back to planning your dream holidays!
                </p>
                <Link href="/" className={styles.homeLink}>
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
