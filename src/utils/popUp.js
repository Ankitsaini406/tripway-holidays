import React, { useState, useEffect } from "react";
import styles from '@/app/page.module.css';

function PopUp({ popTime, closeTime, title, content }) {

    const [showPopUp, setShowPopUp] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const popupTimer = setTimeout(() => {
            setShowPopUp(true);
        }, popTime);

        const closeTimer = setTimeout(() => {
            setShowClose(true);
        }, closeTime);
        return () => {
            clearTimeout(popupTimer);
            clearTimeout(closeTimer);
        };
    }, [popTime, closeTime]);

    useEffect(() => {
        if (!showClose && showPopUp) {
            const interval = setInterval(() => {
                setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [showClose, showPopUp]);

    useEffect(() => {
        if (showPopUp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showPopUp]);


    const closePopUp = () => {
        setShowPopUp(false);
    }

    return (
        <>
            {
                showPopUp && (
                    <div className={styles.popupoverlay}>
                        {
                            showClose ? <button onClick={closePopUp} className={styles.closebutton}>
                                X
                            </button> : <p className={styles.closebutton}>Skip: {countdown}</p>
                        }
                        <div className={styles.popupcontent}>
                            <h2>{title}</h2>
                            <p>{content}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default PopUp;