'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/pages/tourDetails.module.css';
import Loading, { BookingLoding } from './loading';
import dynamic from 'next/dynamic';

const BookingForm = dynamic(() => import('./component').then((mod) => mod.BookingForm));
const TripDetails = dynamic(() => import('./component').then((mod) => mod.TripDetails));

async function fetchTourData(slug) {
    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        const response = await fetch(`${apiPoint}api/group-tours/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch tour data');
        return response.json();
    } catch (error) {
        console.error("Error fetching tour data:", error);
        return null;
    }
}

export default function TourDetailsPage({ slug }) {
    const [isPastDate, setIsPastDate] = useState(false);
    const [tourData, setTourData] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);

    useEffect(() => {
        async function getTourData() {
            const data = await fetchTourData(slug);
            setTourData(data);
        }
        getTourData();
    }, [slug]);

    useEffect(() => {
        if (tourData) {
            const timer = setTimeout(() => {
                setShowBookingForm(true);
            }, 1000);

            return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
        }
    }, [tourData]);

    const imageUrl = process.env.IMAGE_URL;

    const getDateBack = (startDate, daysBack) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() - daysBack);
        return formatDate(date);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const date5DaysBack = getDateBack(tourData?.startDate, 5);

    useEffect(() => {
        if (date5DaysBack) {
            const parsedDate5DaysBack = new Date(date5DaysBack);
            const today = new Date();

            const dateOnlyParsedDate = new Date(parsedDate5DaysBack.setHours(0, 0, 0, 0));
            const dateOnlyToday = new Date(today.setHours(0, 0, 0, 0));

            const isPast = dateOnlyParsedDate < dateOnlyToday;
            setIsPastDate(isPast);
        }
    }, [date5DaysBack]);

    return (
        <div className="layout">
            {tourData ? (
                <div className={styles.tourBox}>
                    <div className={styles.tourdetails}>
                        <div className={styles.tourdetailsBox}>
                            <div className={styles.tourdetailsImg}>
                                <Image
                                    className={styles.tourImg}
                                    src={`${imageUrl}${tourData.imageUrl}`}
                                    alt={tourData.name}
                                    placeholder="blur"
                                    blurDataURL={`${imageUrl}${tourData.imageUrl}`}
                                    width={1600}
                                    height={900}
                                    priority={false}
                                />
                            </div>
                            <div className={styles.tourdetailsText}>
                                <h1>{tourData.name}</h1>
                                <h4>
                                    Category:&nbsp;<strong>{tourData.category}</strong>
                                </h4>
                                <h4>
                                    Price:&nbsp;&#8377;&nbsp;<strong>{tourData.price}</strong>
                                </h4>
                                <h4>
                                    Last&nbsp;date&nbsp;to&nbsp;Book:&nbsp;<strong>{date5DaysBack}</strong>
                                </h4>
                                <h4>
                                    Departure&nbsp;Date:&nbsp;<strong>{tourData.startDate}</strong>
                                </h4>
                                <h4>
                                    Pick&nbsp;Up&nbsp;Points:&nbsp;<strong>{tourData.pickuppoints}</strong>
                                </h4>
                                <p>{tourData.description}</p>
                            </div>
                        </div>
                        <div className={styles.tourdetailsInfo}>
                            <TripDetails tour={tourData} />
                        </div>
                    </div>
                    {showBookingForm ? (
                        <BookingForm tour={tourData} isPastDate={isPastDate} />
                    ) : (
                        <BookingLoding />
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
