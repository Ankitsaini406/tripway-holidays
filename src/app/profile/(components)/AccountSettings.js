import React from "react";
import styles from "@/styles/pages/profile.module.css";

const AccountSettings = ({ userData, accountDetails, passwordDetails, handleInputChange, handleSaveChanges, handlePasswordChange, handlePasswordUpdate, handleCancel, passwordMatch }) => (
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

        <form>
            <div className={styles.inputGroup}>
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                    type="password"
                    name="oldPassword"
                    placeholder="Enter your old password"
                    value={passwordDetails.oldPassword}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={passwordDetails.newPassword}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    value={passwordDetails.confirmNewPassword}
                    onChange={handlePasswordChange}
                    required
                />
            </div>

            <button
                type="button"
                onClick={handlePasswordUpdate}
                className={styles.saveButton}
                disabled={!passwordMatch || !passwordDetails.oldPassword || !passwordDetails.newPassword}
            >
                Change Password
            </button>
        </form>
    </div>
);

export default AccountSettings;
