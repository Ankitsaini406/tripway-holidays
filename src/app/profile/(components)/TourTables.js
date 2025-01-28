'use client';

import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { formatTimestamp } from '@/utils/formatData';
import styles from '@/styles/pages/profile.module.css';
import { database } from '@/firebase/firebaseConfig';

const TourTable = ({ uid, bookings, loading, isAgent, tabType }) => {
    const [enrichedBookings, setEnrichedBookings] = useState([]);

    useEffect(() => {
        const fetchCouponCodes = async () => {
            try {
                let relevantData = [];

                if (tabType === 'referral' && isAgent) {
                    // Fetch agentTours for the Referral Tab
                    const agentToursPath = `users/${uid}/agentTours`;
                    const agentToursRef = ref(database, agentToursPath);
                    const agentSnapshot = await get(agentToursRef);
                    if (agentSnapshot.exists()) {
                        relevantData = Object.values(agentSnapshot.val()).map((tour) => ({
                            ...tour,
                            type: 'Referral',
                        }));
                    }
                } else if (tabType === 'booking') {
                    // Fetch tours for the Booking Tab
                    const toursPath = `users/${uid}/tours`;
                    const toursRef = ref(database, toursPath);
                    const toursSnapshot = await get(toursRef);
                    if (toursSnapshot.exists()) {
                        relevantData = Object.values(toursSnapshot.val()).map((tour) => ({
                            ...tour,
                            type: 'Booking',
                        }));
                    }
                }

                // Enrich bookings data with coupon codes
                const enriched = bookings.map((booking) => {
                    const matchingBooking = relevantData.find((tour) => tour.tourId === booking.id);
                    return {
                        ...booking,
                        couponCode: matchingBooking?.couponCode || 'N/A',
                        type: matchingBooking?.type || 'N/A',
                    };
                });

                setEnrichedBookings(enriched);
            } catch (error) {
                console.error('Error fetching coupon codes:', error);
            }
        };

        fetchCouponCodes();
    }, [bookings, uid, isAgent, tabType]);

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
                            const isFutureBooking =
                                new Date(formatTimestamp(booking.startDate)) <
                                new Date().setHours(0, 0, 0, 0);
                            return (
                                <tr
                                    key={index}
                                    className={`${isFutureBooking ? styles.disabledRow : ''}`}
                                >
                                    <td style={{ backgroundColor: isFutureBooking ? '#F0EFF5' : '' }}>
                                        {formatTimestamp(booking.startDate)}
                                    </td>
                                    <td>{booking.name || booking.userName || 'N/A'}</td>
                                    <td>{booking.from || booking.userFrom || 'N/A'}</td>
                                    <td>
                                        {booking.destinations?.join(', ') ||
                                            booking.destination ||
                                            booking.to ||
                                            booking.tourName ||
                                            'N/A'}
                                    </td>
                                    <td>{booking.passenger || 'N/A'}</td>
                                    <td>
                                        {booking.price
                                            ? `₹${new Intl.NumberFormat('en-IN').format(
                                                totalPrice
                                            )}`
                                            : booking.destination
                                                ? 'Round Trip'
                                                : booking.to
                                                    ? 'One Way'
                                                    : booking.destinations?.join(', ')
                                                        ? 'Multi City'
                                                        : 'N/A'}
                                    </td>
                                    <td className={styles.offerText}>
                                        {booking.offerFrom || ''}
                                    </td>
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
