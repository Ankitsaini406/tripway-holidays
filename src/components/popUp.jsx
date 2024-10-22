import React, { useState, useEffect } from "react";

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
                    <div className="popup-overlay">
                        {
                            showClose ? <button onClick={closePopUp} className="close-button">
                                X
                            </button> : <p className="close-button">Skip: {countdown}</p>
                        }
                        <div className="popup-content">
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
