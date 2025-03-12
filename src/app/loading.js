"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
    return (
        <div style={styles.overlay}>
            <div style={styles.loaderContainer}>
                <DotLottieReact src="/loading.lottie" loop autoplay style={styles.lottie} />
                <p style={styles.text}>Loading...</p>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    loaderContainer: {
        width: "150px",
        height: "150px",
        background: "#fff", 
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
    lottie: {
        width: "100%",
        height: "100%",
    },
    text: {
        marginTop: "10px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
    },
};
