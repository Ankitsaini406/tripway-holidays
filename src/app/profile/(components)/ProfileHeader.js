import React from "react";
import styles from "@/styles/pages/profile.module.css";

const ProfileHeader = ({ userData, logoutUser }) => (
    <div className={styles.profileMain}>
        <div className={styles.profileBox}>
            <div className={styles.profileName}>
                <h2>Welcome, {userData?.name || "User"}</h2>
                <div className={styles.emailDetails}>
                    <p>Email: {userData?.email || "N/A"}</p>
                </div>
                <p>Address: {userData?.address || "N/A"}</p>
            </div>
            {userData?.role === 'Agent' && (
                <div className={styles.flexCode}>
                    Agent Code: <span className={styles.agentCode}>{userData?.agentCode}</span>
                </div>
            )}
        </div>
        <button className={styles.logOutButton} onClick={logoutUser}>
            Logout
        </button>
    </div>
);

export default ProfileHeader;
