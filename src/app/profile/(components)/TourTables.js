'use client';

import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { formatTimestamp } from '@/utils/formatData';
import styles from '@/styles/pages/profile.module.css';
import { database } from '@/firebase/firebaseConfig';

const TourTable = ({ uid, bookings, loading, isAgent }) => {
    const [enrichedBookings, setEnrichedBookings] = useState([]);

    useEffect(() => {
        const fetchCouponCode = async (tourId) => {
            try {
                const path = isAgent
                    ? `users/${uid}/agentTours/${tourId}`
                    : `users/${uid}/tours/${tourId}`;

                const dbRef = ref(database, path);
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    return data.couponCodes || "N/A";
                } else {
                    return "N/A";
                }
            } catch (error) {
                console.error("Error fetching coupon code:", error);
                return "Error";
            }
        };

        const enrichBookingsWithCouponCodes = async () => {
            const enriched = await Promise.all(
                bookings.map(async (booking) => {
                    const couponCode = await fetchCouponCode(booking.id);
                    return { ...booking, couponCode };
                })
            );
            setEnrichedBookings(enriched);
        };

        enrichBookingsWithCouponCodes();
    }, [bookings, uid, isAgent]);

    if (loading) {
        return <p>Loading bookings...</p>;
    }

    return (
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
                        <th>Coupon Code</th>
                    </tr>
                </thead>
                <tbody>
                    {enrichedBookings.length > 0 ? (
                        enrichedBookings.map((booking, index) => {
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
                                    <td>{booking.destinations?.join(", ") || booking.destination || booking.to || booking.tourName || 'N/A'}</td>
                                    <td>{booking.passenger || 'N/A'}</td>
                                    <td>
                                        {booking.price
                                            ? `₹${new Intl.NumberFormat('en-IN').format(totalPrice)}`
                                            : booking.destination ? 'Round Trip' : booking.to ? 'One Way' : booking.destinations?.join(", ") ? 'Multi City' : 'N/A'}
                                    </td>
                                    <td className={styles.offerText}>{booking.offerFrom || ''}</td>
                                    <td className={styles.offerText}>{booking.couponCode || ''}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8">No bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TourTable;
