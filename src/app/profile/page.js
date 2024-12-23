'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { useClient } from '@/context/UserContext';
import useUserBookings from '@/hook/useUserBooking';
import { formatTimestamp } from '@/utils/formatData';
import styles from '@/styles/pages/profile.module.css';
import { auth, database } from '@/firebase/firebaseConfig';
import { toast } from 'react-toastify';

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();
    const {
        userData,
        agentBookings = [],
        userBookings = [],
        loadingUser,
        loadingBookings,
        error,
    } = useUserBookings(user);

    const [activeTab, setActiveTab] = useState('bookingHistory');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAgentBookings, setFilteredAgentBookings] = useState(agentBookings);
    const [filteredUserBookings, setFilteredUserBookings] = useState(userBookings);
    const [accountDetails, setAccountDetails] = useState({
        displayName: '',
        phoneNumber: '',
        address: '',
    });
    const [originalAccountDetails, setOriginalAccountDetails] = useState({
        displayName: userData?.name || '',
        phoneNumber: userData?.phoneNumber || '',
        address: userData?.address || '',
    });

    const [passwordDetails, setPasswordDetails] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
        setFilteredAgentBookings(agentBookings);
        setFilteredUserBookings(userBookings);
    }, [agentBookings, userBookings]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const bookings = activeTab === 'agentRef' ? agentBookings : userBookings;
        const setFiltered = activeTab === 'agentRef' ? setFilteredAgentBookings : setFilteredUserBookings;

        const filtered = bookings.filter((booking) =>
            Object.values(booking).some((value) =>
                value?.toString().toLowerCase().includes(query.toLowerCase())
            )
        );

        setFiltered(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setAccountDetails({
            displayName: originalAccountDetails.displayName,
            phoneNumber: originalAccountDetails.phoneNumber,
            address: originalAccountDetails.address,
        });
    };

    const handleSaveChanges = async () => {
        const updatedValues = {};
        // Check if each field has changed, and update accordingly
        if (accountDetails.displayName !== originalAccountDetails.displayName) {
            updatedValues.displayName = accountDetails.displayName;
        }
        if (accountDetails.phoneNumber !== originalAccountDetails.phoneNumber) {
            updatedValues.phoneNumber = accountDetails.phoneNumber;
        }
        if (accountDetails.address !== originalAccountDetails.address) {
            updatedValues.address = accountDetails.address;
        }

        if (Object.keys(updatedValues).length > 0) {
            try {
                // Update the Firebase Realtime Database directly
                const userRef = ref(database, `users/${userData?.uid}`);
                await update(userRef, updatedValues);

                const user = auth.currentUser;
                if (user && updatedValues.displayName) {
                    await updateProfile(user, { displayName: updatedValues.displayName });
                    await updatePhoneNumber(user, { phoneNumber: updatedValues.phoneNumber });
                }

                // Update the original account details to reflect the changes
                setOriginalAccountDetails({
                    displayName: accountDetails.displayName,
                    phoneNumber: accountDetails.phoneNumber,
                    address: accountDetails.address,
                });

                console.log('User updated successfully');
            } catch (error) {
                console.error('Error updating account details:', error);
                alert('Failed to update account details');
            }
        } else {
            console.log('No changes detected');
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordDetails((prev) => ({ ...prev, [name]: value }));

        if (name === 'confirmNewPassword' || name === 'newPassword') {
            setPasswordMatch(passwordDetails.newPassword === value);
        }
    };

    const handlePasswordUpdate = async () => {
        const { oldPassword, newPassword, confirmNewPassword } = passwordDetails;

        if (!passwordMatch || newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match!');
            return;
        }

        const user = auth.currentUser;

        if (user) {
            try {
                // Reauthenticate user before updating the password
                const credential = EmailAuthProvider.credential(user.email, oldPassword);
                await reauthenticateWithCredential(user, credential);

                // Update password
                await updatePassword(user, newPassword);

                const userRef = ref(database, `users/${userData?.uid}`);
                await update(userRef, {
                    password: newPassword,
                    verifyPassword: confirmNewPassword,
                });
                toast.success('Password updated successfully!');
                setPasswordDetails({
                    oldPassword: '',
                    password: '',
                    verifyPassword: '',
                });
            } catch (error) {
                console.error('Error updating password:', error);
                toast.error('Failed to update password. Please check your old password.');
            }
        } else {
            toast.error('User not authenticated.');
        }
    };


    const handleLogOut = () => {
        logoutUser();
        router.push('/');
    };

    const renderTable = (bookings) => (
        <div className={styles.bookingTableContainer}>
            <table className={styles.bookingTable}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Passengers</th>
                        <th>Total Price</th>
                        <th>Offer From</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => {
                            const totalPrice = booking.price * booking.passenger;
                            const isFutureBooking = new Date(formatTimestamp(booking.startDate)) < new Date().setHours(0, 0, 0, 0);
                            return (
                                <tr
                                    key={index}
                                    className={`${isFutureBooking ? styles.disabledRow : ''}`}
                                >
                                    <td style={{ backgroundColor: isFutureBooking ? '#F0EFF5' : '' }}>{formatTimestamp(booking.startDate)}</td>
                                    <td>{booking.name || booking.userName || 'N/A'}</td>
                                    <td>{booking.from || booking.userFrom || 'N/A'}</td>
                                    <td>{booking.destinations?.join(', ') || booking.to || 'N/A'}</td>
                                    <td>{booking.passenger || 'N/A'}</td>
                                    <td>
                                        {booking.price
                                            ? `₹${new Intl.NumberFormat('en-IN').format(totalPrice)}`
                                            : booking.destination ? 'Round Trip' : booking.to ? 'One Way' : booking.destinations?.join(", ") ? 'Multi City' : 'N/A'}
                                    </td>
                                    <td className={styles.offerText}>{booking.offerFrom || ''}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="7">No bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="layout">
            {loadingUser ? (
                <p>Loading user data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.profile}>
                    <div className={styles.profileMain}>
                        <div className={styles.profileBox}>
                            <div className={styles.profileName}>
                                <h2>Welcome, {userData?.name || 'User'}</h2>
                                <p>Email: {userData?.email || 'N/A'}</p>
                                <p>Address: {userData?.address || 'N/A'}</p>
                            </div>
                            {userData?.isAgent && (
                                <div className={styles.flexCode}>
                                    Agent Code: <span className={styles.agentCode}>{userData?.agentCode}</span>
                                </div>
                            )}
                        </div>
                        <button className={styles.logOutButton} onClick={handleLogOut}>
                            Logout
                        </button>
                    </div>

                    <div className={styles.profileDetailsBox}>
                        <div className={styles.buttonFlex}>
                            {userData?.isAgent && (
                                <button
                                    className={`${styles.button} ${activeTab === 'agentRef' ? styles.active : ''}`}
                                    onClick={() => setActiveTab('agentRef')}
                                >
                                    Referral&nbsp;History&nbsp;({agentBookings.length})
                                </button>
                            )}
                            <button
                                className={`${styles.button} ${activeTab === 'bookingHistory' ? styles.active : ''}`}
                                onClick={() => setActiveTab('bookingHistory')}
                            >
                                Booking&nbsp;History&nbsp;({userBookings.length})
                            </button>
                            <button
                                className={`${styles.button} ${activeTab === 'accountSetting' ? styles.active : ''}`}
                                onClick={() => setActiveTab('accountSetting')}
                            >
                                Account&nbsp;Settings
                            </button>
                        </div>

                        {activeTab === 'accountSetting' ? (
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
                        ) : (
                            <div>
                                <input
                                    className={styles.searchBar}
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search here..."
                                />
                                {loadingBookings ? (
                                    <p>Loading...</p>
                                ) : (
                                    renderTable(
                                        activeTab === 'agentRef' ? filteredAgentBookings : filteredUserBookings
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
