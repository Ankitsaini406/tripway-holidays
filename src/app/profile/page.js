'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import styles from "@/styles/pages/profile.module.css";
import { formatTimestamp } from '@/utils/formatData';
import useUserBookings from '@/hook/useUserBooking';

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();
    const [activeBtn, setActiveBtn] = useState('bookingHistory');

    const { userData, agentBookings, userBookings, loadingUser, loadingBookings, error } = useUserBookings(user);

    const [accountDetails, setAccountDetails] = useState({
        displayName: '',
        phoneNumber: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        setAccountDetails({
            displayName: userData?.name || '',
            phoneNumber: userData?.phoneNumber || '',
            address: userData?.address || '',
        });
    };

    const handleSaveChanges = () => {
        // Add logic to save the updated details
        console.log("Updated Account Details:", accountDetails);
    };

    const handleLogOut = () => {
        logoutUser();
        router.push('/');
    };

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
                            <div>
                                <h2>Welcome, {userData?.name || 'User'}</h2>
                                <p>Email: {userData?.email}</p>
                                <p>Address: {userData?.address || 'N/A'}</p>
                            </div>
                            {
                                userData?.isAgent ? <div className={styles.flexCode}>Agent&nbsp;Code&nbsp;:&nbsp;<div className={styles.agentCode}>{userData?.agentCode}</div></div> : null
                            }
                        </div>
                        <button className={styles.logOutButton} onClick={handleLogOut}>Logout</button>
                    </div>
                    <div className={styles.profileDetailsBox}>
                        <div className={styles.buttonFlex}>

                            {
                                userData?.isAgent ?
                                    <button
                                        className={`${styles.button} ${activeBtn === 'agentRef' ? styles.active : ''}`}
                                        onClick={() => setActiveBtn('agentRef')}
                                    >
                                        Referral&nbsp;History&nbsp;({agentBookings.length})
                                    </button>
                                    : null
                            }

                            {/* Booking History Button */}
                            <button
                                className={`${styles.button} ${activeBtn === 'bookingHistory' ? styles.active : ''}`}
                                onClick={() => setActiveBtn('bookingHistory')}
                            >
                                Booking&nbsp;History&nbsp;({userBookings.length}) {/* Adjust this count based on booking data */}
                            </button>

                            {/* Account Setting Button */}
                            <button
                                className={`${styles.button} ${activeBtn === 'accountSetting' ? styles.active : ''}`}
                                onClick={() => setActiveBtn('accountSetting')}
                            >
                                Account&nbsp;Setting
                            </button>
                        </div>

                        <div>
                            {/* Conditional rendering based on active button */}
                            {activeBtn === 'bookingHistory' ? (
                                loadingBookings ? (
                                    <p>Loading bookings...</p>
                                ) : (
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
                                                {userBookings.length > 0 ? (
                                                    userBookings.map((booking, index) => {
                                                        const totalPrice = booking.price * booking.passenger;
                                                        const bookingDate = new Date(formatTimestamp(booking.startDate));
                                                        const todayDate = new Date();
                                                        todayDate.setHours(0, 0, 0, 0);
                                                        const isFutureBooking = bookingDate < todayDate;
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className={`${index % 2 === 0 ? styles.evenRow : styles.oddRow} ${isFutureBooking ? styles.disabledRow : ''}`}
                                                            >
                                                                <td style={{ backgroundColor: isFutureBooking ? '#F0EFF5' : '' }}>{formatTimestamp(booking.startDate)}</td>

                                                                {/* Name or UserName */}
                                                                <td className={(booking.name === null || booking.name === '' || booking.userName === null || booking.userName === '') ? styles.naText : ''}>
                                                                    {booking.name || booking.userName || 'N/A'}
                                                                </td>

                                                                {/* From or UserFrom */}
                                                                <td className={(booking.from === null || booking.from === '' || booking.userFrom === null || booking.userFrom === '') ? styles.naText : ''}>
                                                                    {booking.from || booking.userFrom || 'N/A'}
                                                                </td>

                                                                {/* Destinations or other possible fields */}
                                                                <td>
                                                                    {booking.destinations?.join(", ") ||
                                                                        booking.destination ||
                                                                        booking.to ||
                                                                        booking.tourName ||
                                                                        'N/A'}
                                                                </td>

                                                                {/* Passengers */}
                                                                <td className={(booking.passenger === null || booking.passenger === '' || booking.passenger === 'N/A') ? styles.naText : ''}>
                                                                    {booking.passenger || 'N/A'}
                                                                </td>

                                                                {/* Price or other price-related info */}
                                                                <td>
                                                                    {booking.price
                                                                        ? `₹${new Intl.NumberFormat('en-IN').format(totalPrice)}`
                                                                        : booking.destination ? 'Round Trip' : booking.to ? 'One Way' : booking.destinations?.join(", ") ? 'Multi City' : 'N/A'}
                                                                </td>

                                                                {/* Offer From */}
                                                                <td className={(booking.offerFrom === null || booking.offerFrom === '') ? styles.naText : styles.offerText}>
                                                                    {booking.offerFrom || ''}
                                                                </td>
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
                                )
                            ) : activeBtn === 'agentRef' ? (
                                loadingBookings ? (
                                    <p>Loading Agent Referrals...</p>
                                ) : (
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
                                                {agentBookings.length > 0 ? (
                                                    agentBookings.map((booking, index) => {
                                                        const totalPrice = booking.price * booking.passenger;
                                                        const bookingDate = new Date(formatTimestamp(booking.startDate));
                                                        const todayDate = new Date();
                                                        todayDate.setHours(0, 0, 0, 0);
                                                        const isFutureBooking = bookingDate < todayDate;
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className={`${index % 2 === 0 ? styles.evenRow : styles.oddRow} ${isFutureBooking ? styles.disabledRow : ''}`}
                                                            >
                                                                <td style={{ backgroundColor: isFutureBooking ? '#F0EFF5' : '' }}>{formatTimestamp(booking.startDate)}</td>

                                                                {/* Name or UserName */}
                                                                <td className={(booking.name === null || booking.name === '' || booking.userName === null || booking.userName === '') ? styles.naText : ''}>
                                                                    {booking.name || booking.userName || 'N/A'}
                                                                </td>

                                                                {/* From or UserFrom */}
                                                                <td className={(booking.from === null || booking.from === '' || booking.userFrom === null || booking.userFrom === '') ? styles.naText : ''}>
                                                                    {booking.from || booking.userFrom || 'N/A'}
                                                                </td>

                                                                {/* Destinations or other possible fields */}
                                                                <td>
                                                                    {booking.destinations?.join(", ") ||
                                                                        booking.destination ||
                                                                        booking.to ||
                                                                        booking.tourName ||
                                                                        'N/A'}
                                                                </td>

                                                                {/* Passengers */}
                                                                <td className={(booking.passenger === null || booking.passenger === '' || booking.passenger === 'N/A') ? styles.naText : ''}>
                                                                    {booking.passenger || 'N/A'}
                                                                </td>

                                                                {/* Price or other price-related info */}
                                                                <td>
                                                                    {booking.price
                                                                        ? `₹${new Intl.NumberFormat('en-IN').format(totalPrice)}`
                                                                        : booking.destination ? 'Round Trip' : booking.to ? 'One Way' : booking.destinations?.join(", ") ? 'Multi City' : 'N/A'}
                                                                </td>

                                                                {/* Offer From */}
                                                                <td className={(booking.offerFrom === null || booking.offerFrom === '') ? styles.naText : styles.offerText}>
                                                                    {booking.offerFrom || ''}
                                                                </td>
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
                                )
                            ) : (
                                <div className={styles.buttonBox}>
                                    <form>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="displayName">Name:</label>
                                            <input
                                                type="text"
                                                name="displayName"
                                                id="displayName"
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
                                                id="phoneNumber"
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
                                                id="address"
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
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default ProfilePage;
