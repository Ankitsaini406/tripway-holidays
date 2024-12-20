'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import { get, ref } from 'firebase/database';
import { database, firestore } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import styles from "@/styles/pages/profile.module.css";
import { formatTimestamp } from '@/utils/formatData';

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();
    const [userData, setUserData] = useState(null);
    const [activeBtn, setActiveBtn] = useState('agentRef');
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user?.uid) return;

        const fetchUserData = async () => {
            try {
                setLoadingUser(true);
                const userRef = ref(database, `users/${user.uid}`);
                const snapshot = await get(userRef);

                if (!snapshot.exists()) {
                    setError('User data not found.');
                    return;
                }

                setUserData(snapshot.val());
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUserData();
    }, [user?.uid]);

    useEffect(() => {
        if (!userData) return;

        const fetchUserBookings = async () => {
            try {
                setLoadingBookings(true);
                const toursRef = ref(database, `users/${user.uid}/tours`);
                const toursSnapshot = await get(toursRef);

                if (!toursSnapshot.exists()) {
                    setBookings([]);
                    return;
                }

                const tourIds = Object.keys(toursSnapshot.val());
                const allBookings = await fetchBookings(tourIds);
                setBookings(allBookings);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Failed to load bookings.');
            } finally {
                setLoadingBookings(false);
            }
        };

        fetchUserBookings();
    }, [userData]);

    const fetchBookings = async (tourIds) => {
        const bookingPromises = tourIds.flatMap((tourId) => [
            getDoc(doc(firestore, 'user-tours', tourId)),
            getDoc(doc(firestore, 'one-way', tourId)),
            getDoc(doc(firestore, 'round-trip', tourId)),
            getDoc(doc(firestore, 'multi-city', tourId)),
        ]);

        const snapshots = await Promise.all(bookingPromises);

        const allBookings = snapshots
            .filter((snapshot) => snapshot.exists())
            .map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));

        return allBookings.sort((a, b) => {
            const dateA = new Date(a.startDate?.toDate ? a.startDate.toDate() : a.startDate);
            const dateB = new Date(b.startDate?.toDate ? b.startDate.toDate() : b.startDate);
            return dateB - dateA; // Descending order
        });
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
                                <h2>Welcome, {userData.name || 'User'}</h2>
                                <p>Email: {userData.email}</p>
                                <p>Address: {userData.address || 'N/A'}</p>
                            </div>
                        </div>
                        <button className={styles.logOutButton} onClick={handleLogOut}>Logout</button>
                    </div>
                    <div className={styles.profileDetailsBox}>
                        <div className={styles.buttonFlex}>
                            {/* Refrel History Button */}
                            <button
                                className={`${styles.button} ${activeBtn === 'agentRef' ? styles.active : ''}`}
                                onClick={() => setActiveBtn('agentRef')}
                            >
                                Referral&nbsp;History&nbsp;({bookings.length}) {/* Adjust this count based on referral history if needed */}
                            </button>

                            {/* Booking History Button */}
                            <button
                                className={`${styles.button} ${activeBtn === 'bookingHistory' ? styles.active : ''}`}
                                onClick={() => setActiveBtn('bookingHistory')}
                            >
                                Booking&nbsp;History&nbsp;({bookings.length}) {/* Adjust this count based on booking data */}
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
                                                {bookings.length > 0 ? (
                                                    bookings.map((booking, index) => {
                                                        const totalPrice = booking.price * booking.passenger;
                                                        return (
                                                            <tr
                                                                key={index}
                                                                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                                                            >
                                                                <td>{formatTimestamp(booking.startDate)}</td>

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
                                <div>
                                    <h3>Referral History</h3>
                                    {/* Display referral history here */}
                                    <p>No referrals found.</p>
                                </div>
                            ) : (
                                <div className={styles.buttonBox}>
                                    <h3>Account Setting</h3>
                                    <p>Display Account Settings</p>
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
