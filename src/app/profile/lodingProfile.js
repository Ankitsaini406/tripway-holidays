import styles from '@/styles/pages/profile.module.css';

export function ProfileLoding() {
    return (
        <div className={styles.profile} style={{ alignItems: 'center', padding: '1rem' }}>
            <div className={`${styles.loadingProfile} ${styles.shimmer}`}></div>
            <div className={`${styles.loadingText} ${styles.shimmer}`}></div>
            <div className={`${styles.loadingButton} ${styles.shimmer}`}></div>
        </div>
    );
}

export function ProfileTbale() {
    return (
        <div class={styles.bookingTableContainer}>
            <div class={`${styles.loadingTable} ${styles.shimmer}`}></div>
        </div>
    )
}