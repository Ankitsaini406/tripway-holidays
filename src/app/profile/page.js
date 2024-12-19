'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import { get, ref } from 'firebase/database';
import { database, firestore } from '@/firebase/firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import styles from "@/styles/pages/profile.module.css";

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();
    const [userData, setUserData] = useState(null);
    const [activeBtn, setActiveBtn] = useState('bookingHistory');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]); // Combined booking data

    useEffect(() => {
        if (user?.uid) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);

                try {
                    // Fetch user data
                    const userRef = ref(database, `users/${user.uid}`);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        setUserData(snapshot.val());

                        const toursRef = ref(database, `users/${user.uid}/tours`);
                        const toursSnapshot = await get(toursRef);

                        if (toursSnapshot.exists()) {
                            const tourIds = Object.keys(toursSnapshot.val());

                            const allBookings = await fetchBookings(tourIds);
                            setBookings(allBookings);
                        } else {
                            setError('No tour is booking by you.');
                        }
                    } else {
                        console.error('No user data available.');
                        setError('User data not found.');
                    }

                } catch (err) {
                    console.error('Error fetching data:', err);
                    setError('Failed to load data.');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [user?.uid]);

    const fetchBookings = async (tourIds) => {
        const allBookings = [];
        for (const tourId of tourIds) {
            // You can fetch the individual tour document based on tourId from Firestore
            const tourRef = doc(firestore, 'user-tours', tourId);
            const tourSnapshot = await getDoc(tourRef);

            if (tourSnapshot.exists()) {
                const tourData = { id: tourSnapshot.id, ...tourSnapshot.data() };
                allBookings.push(tourData);
            }
        }

        for (const tourId of tourIds) {
            // You can fetch the individual tour document based on tourId from Firestore
            const tourRef = doc(firestore, 'one-way', tourId);
            const tourSnapshot = await getDoc(tourRef);

            if (tourSnapshot.exists()) {
                const tourData = { id: tourSnapshot.id, ...tourSnapshot.data() };
                allBookings.push(tourData);
            }
        }

        for (const tourId of tourIds) {
            // You can fetch the individual tour document based on tourId from Firestore
            const tourRef = doc(firestore, 'round-trip', tourId);
            const tourSnapshot = await getDoc(tourRef);

            if (tourSnapshot.exists()) {
                const tourData = { id: tourSnapshot.id, ...tourSnapshot.data() };
                allBookings.push(tourData);
            }
        }

        for (const tourId of tourIds) {
            // You can fetch the individual tour document based on tourId from Firestore
            const tourRef = doc(firestore, 'multi-city', tourId);
            const tourSnapshot = await getDoc(tourRef);

            if (tourSnapshot.exists()) {
                const tourData = { id: tourSnapshot.id, ...tourSnapshot.data() };
                allBookings.push(tourData);
            }
        }

        allBookings.sort((a, b) => {
            const dateA = a.startDate?.toDate ? a.startDate.toDate() : new Date(a.startDate);
            const dateB = b.startDate?.toDate ? b.startDate.toDate() : new Date(b.startDate);
            return dateB - dateA; // Descending order
        });

        console.log(allBookings);
        return allBookings;
    };

    const formatTimestamp = (timestamp) => {
        if (timestamp instanceof Timestamp) {
            const date = timestamp.toDate();
            return formatDate(date);
        } else if (typeof timestamp === 'string' || timestamp instanceof Date) {
            const date = new Date(timestamp);
            return formatDate(date);
        }
        return timestamp;
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleLogOut = () => {
        router.push('/');
        logoutUser();
    };

    const handleButtonClick = (buttonName) => {
        setActiveBtn(buttonName);
    };

    return (
        <div className="layout">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : userData ? (
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
                                onClick={() => handleButtonClick('bookingHistory')}
                            >
                                Booking History ({bookings.length})
                            </button>
                            <button
                                className={`${styles.button} ${activeBtn === 'accountSetting' ? styles.active : ''}`}
                                onClick={() => handleButtonClick('accountSetting')}
                            >
                                Account Setting
                            </button>
                        </div>
                        <div>
                            {activeBtn === 'bookingHistory' && (
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
                                                            {booking.destinations?.length > 0
                                                                ? booking.destinations.join(", ")
                                                                : booking.destination || booking.to || booking.tourName ||'N/A'}
                                                        </td>
                                                        <td>{booking.price || 'Cab'}</td>
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
                            )}
                            {activeBtn === 'accountSetting' && (
                                <div className={styles.buttonBox}>
                                    <h3>Account Setting</h3>
                                    <p>Display Account Setting</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
}

export default ProfilePage;
