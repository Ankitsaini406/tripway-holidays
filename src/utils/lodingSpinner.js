import React from "react";
import styles from '@/styles/components/loadingSpinner.module.css'

function LoadingSpinner() {

    return (
        <div style={{ margin: "30px auto"}}>
        <div className={styles.loaderContainer}>
            <div className={styles.loader}>
            </div>
        </div>
        </div>
    )
}

export default LoadingSpinner;