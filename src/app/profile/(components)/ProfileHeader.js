import React from "react";
import { VscUnverified, VscVerifiedFilled } from "react-icons/vsc";
import styles from "@/styles/pages/profile.module.css";

const ProfileHeader = ({ userData, user, verificationEmail, logoutUser }) => (
    <div className={styles.profileMain}>
        <div className={styles.profileBox}>
            <div className={styles.profileName}>
                <h2>Welcome, {userData?.name || "User"}</h2>
                <div className={styles.emailDetails}>
                    <p>Email: {userData?.email || "N/A"}</p>
                    {userData?.email && (
                        user?.emailVerified ? (
                            <span><VscVerifiedFilled /></span>
                        ) : (
                            <span onClick={verificationEmail}><VscUnverified /></span>
                        )
                    )}
                </div>
                <p>Address: {userData?.address || "N/A"}</p>
            </div>
            {userData?.isAgent && (
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
