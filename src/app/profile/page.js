'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import { get, ref } from 'firebase/database';
import { database, firestore } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import styles from "@/styles/pages/profile.module.css";

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();
    const [userData, setUserData] = useState(null);
    const [activeBtn, setActiveBtn] = useState('bookingHistory');
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

    const formatTimestamp = (timestamp) => {
        if (timestamp instanceof Timestamp) {
            return formatDate(timestamp.toDate());
        }
        return formatDate(new Date(timestamp));
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${day}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
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
                            <button
                                className={`${styles.button} ${activeBtn === 'bookingHistory' ? styles.active : ''}`}
                                onClick={() => setActiveBtn('bookingHistory')}
                            >
                                Booking History ({bookings.length})
                            </button>
                            <button
                                className={`${styles.button} ${activeBtn === 'accountSetting' ? styles.active : ''}`}
                                onClick={() => setActiveBtn('accountSetting')}
                            >
                                Account Setting
                            </button>
                        </div>
                        <div>
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
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.length > 0 ? (
                                                    bookings.map((booking, index) => (
                                                        <tr
                                                            key={index}
                                                            className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                                                        >
                                                            <td>{formatTimestamp(booking.startDate)}</td>
                                                            <td>{booking.name || 'N/A'}</td>
                                                            <td>{booking.from || booking.userFrom || 'N/A'}</td>
                                                            <td>
                                                                {booking.destinations?.join(", ") ||
                                                                    booking.destination ||
                                                                    booking.to ||
                                                                    booking.tourName ||
                                                                    'N/A'}
                                                            </td>
                                                            <td>{booking.price ? `₹${new Intl.NumberFormat('en-IN').format(booking.price)}` : 'Cab'}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5">No bookings found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            ) : (
                                <div className={styles.buttonBox}>
                                    <h3>Account Setting</h3>
                                    <p>Display Account Setting</p>
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
