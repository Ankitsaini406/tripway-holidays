"use client";

import { PiCertificateLight } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import styles from "@/styles/pages/selectCabs.module.css";

export default function SelectCars() {

    const aisensy = process.env.AI_SENSY;

    const sendMessage = async () => {
        try {
            const res = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
                method: "POST",
                body: JSON.stringify({
                    apiKey: `${aisensy}`,
                    campaignName: "libraryfist_message",
                    destination: "+918233101033",
                    userName: "Sandeep Kumar Soni",
                    templateParams: ["Ashish Raina"]
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to send message: ${text}`);
            }

            const data = await res.json();
            console.log("WhatsApp Response:", res.body);

            if (data.success) {
                alert("Message sent successfully!");
            } else {
                alert("Failed to send message. Check console for details.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="layout">
            <div className={styles.carMainBox}>
                <div className={styles.carFlex}>
                    <div className={styles.carBox}>
                        <div className={styles.carImg}></div>
                        <div>Shift</div>
                    </div>
                    <div className={styles.carDetailsBox}>
                        <div className={styles.itemBox}>
                            <PiCertificateLight />
                            <h5>Top Rated Cabs & Chauffeurs</h5>
                        </div>
                        <div className={styles.itemBox}>
                            <IoNewspaperOutline />
                            <h5>₹ 480 Toll included</h5>
                        </div>
                        <div className={styles.itemBox} style={{ gap: "0" }}>
                            <h4>₹ 1900</h4>
                            <h6>Save ₹ 100</h6>
                        </div>
                        <div className={styles.itemBox} style={{ gap: "0" }}>
                            <h3>₹ 1800</h3>
                            <h5>Up to 130 Km</h5>
                        </div>
                    </div>
                    <button className={styles.selectBtn} onClick={sendMessage}>
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
}
