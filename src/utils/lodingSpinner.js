import React from "react";
import styles from '@/styles/components/loadingSpinner.module.css'

function LoadingSpinner() {

    return (
        <>
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
            </div>
        </div>
        </>
    )
}

export default LoadingSpinner;