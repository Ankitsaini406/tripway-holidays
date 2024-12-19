'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import { get, ref } from 'firebase/database';
import { database } from '@/firebase/firebaseConfig';
import styles from "@/styles/pages/profile.module.css";

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();
    const [userData, setUserData] = useState(null);
    const [activeBtn, setActiveBtn] = useState('bookingHistory');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const bookingData = [
        { date: '2024-12-01', name: 'John Doe', from: 'New York', to: 'Los Angeles', price: '$300' },
        { date: '2024-12-05', name: 'Jane Smith', from: 'Chicago', to: 'Miami', price: '$200' },
        { date: '2024-12-10', name: 'Alice Johnson', from: 'Houston', to: 'San Francisco', price: '$400' },
        { date: '2024-12-15', name: 'Bob Brown', from: 'Seattle', to: 'Denver', price: '$150' },
    ];

    useEffect(() => {
        if (user?.uid) {
            const fetchUserData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const userRef = ref(database, `users/${user.uid}`);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    } else {
                        console.error('No data available for this user.');
                        setError('User data not found.');
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError('Failed to load user data.');
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [user?.uid]);

    const handleLogOut = () => {
        router.push('/');
        logoutUser();
    };

    const handleButtonClick = (buttonName) => {
        setActiveBtn(buttonName); // Set the clicked button as active
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
                                Booking History
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
                                            {bookingData.map((booking, index) => (
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                                                >
                                                    <td>{booking.date}</td>
                                                    <td>{booking.name}</td>
                                                    <td>{booking.from}</td>
                                                    <td>{booking.to}</td>
                                                    <td>{booking.price}</td>
                                                </tr>
                                            ))}
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
