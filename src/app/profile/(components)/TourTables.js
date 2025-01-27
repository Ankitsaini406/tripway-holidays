// BookingTable.js
'use client';

import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { formatTimestamp } from '@/utils/formatData';
import styles from '@/styles/pages/profile.module.css';
import { database } from '@/firebase/firebaseConfig';

const TourTable = ({ bookings, loading }) => {
    const [enrichedBookings, setEnrichedBookings] = useState([]);

    const fetchCouponCode = async (tourId) => {
        try {
            const dbRef = ref(database, `users/tours/${tourId}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                return data.couponCode || "N/A";
            } else {
                return "N/A";
            }
        } catch (error) {
            console.error("Error fetching coupon code:", error);
            return "Error";
        }
    };

    useEffect(() => {
        const enrichBookingsWithCouponCodes = async () => {
            const enriched = await Promise.all(
                bookings.map(async (booking) => {
                    const couponCode = await fetchCouponCode(booking.tourId);
                    return { ...booking, couponCode };
                })
            );
            setEnrichedBookings(enriched);
        };

        enrichBookingsWithCouponCodes();
    }, [bookings]);

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
