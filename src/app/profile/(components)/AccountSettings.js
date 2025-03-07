import React from "react";
import styles from "@/styles/pages/profile.module.css";

const AccountSettings = ({ userData, accountDetails, handleInputChange, handleSaveChanges, handleCancel }) => (
    <div className={styles.buttonBox}>
        <form>
            <div className={styles.inputGroup}>
                <label htmlFor="displayName">Name:</label>
                <input
                    type="text"
                    name="displayName"
                    placeholder={`${userData?.name || 'Name'}`}
                    value={accountDetails.displayName}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="number"
                    name="phoneNumber"
                    placeholder={`${userData?.phoneNumber || 'Phone Number'}`}
                    value={accountDetails.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    name="address"
                    placeholder={`${userData?.address || 'Address'}`}
                    value={accountDetails.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.buttonBox}>
                <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </button>
                <button type="button" onClick={handleSaveChanges} className={styles.saveButton}>
                    Save Changes
                </button>
            </div>
        </form>
    </div>
);

export default AccountSettings;
