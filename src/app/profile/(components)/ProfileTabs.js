import React from "react";
import styles from "@/styles/pages/profile.module.css";

const ProfileTabs = ({ activeTab, setActiveTab, agentBookings, userBookings, isAgent }) => (
    <div className={styles.buttonFlex}>
        {isAgent && (
            <button
                className={`${styles.button} ${activeTab === "agentRef" ? styles.active : ""}`}
                onClick={() => setActiveTab("agentRef")}
            >
                Referral&nbsp;History&nbsp;({agentBookings.length})
            </button>
        )}
        <button
            className={`${styles.button} ${activeTab === "bookingHistory" ? styles.active : ""}`}
            onClick={() => setActiveTab("bookingHistory")}
        >
            Booking&nbsp;History&nbsp;({userBookings.length})
        </button>
        <button
            className={`${styles.button} ${activeTab === "accountSetting" ? styles.active : ""}`}
            onClick={() => setActiveTab("accountSetting")}
        >
            Account&nbsp;Settings
        </button>
    </div>
);

export default ProfileTabs;
