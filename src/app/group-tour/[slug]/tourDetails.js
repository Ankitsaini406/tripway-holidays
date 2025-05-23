'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from './loading';
import dynamic from 'next/dynamic';
import { BookingForm } from './component';
// const BookingForm = dynamic(() => import('./component').then((mod) => mod.BookingForm));
const TripDetails = dynamic(() => import('./component').then((mod) => mod.TripDetails));
import styles from '@/styles/pages/tourDetails.module.css';
import { formatPrice } from '@/utils/formatData';

export default function TourDetailsPage({ tourData }) {
    const [isPastDate, setIsPastDate] = useState(false);

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

    const discountPrice = tourData?.price ? (tourData.price * (1 - tourData.discount / 100)).toFixed(0) : null;

    return (
        <div className="layout">
            {tourData ? (
                <div className={styles.tourBox}>
                    <div className={styles.tourdetails}>
                        <div className={styles.tourdetailsBox}>
                            <div className={styles.tourdetailsImg}>
                                <Image
                                    className={styles.tourImg}
                                    sizes="(max-width: 400px) 100vw, 200px"
                                    src={`${imageUrl}${tourData.imageUrl}`}
                                    alt={tourData.name}
                                    placeholder="blur"
                                    onError={() => 'tripway-palceholder.webp'}
                                    blurDataURL='/tripway-palceholder.webp'
                                    fill
                                    priority
                                />
                            </div>
                            <div className={styles.tourdetailsText}>
                                <h1>{tourData.name}</h1>
                                <h4>
                                    Category:&nbsp;<strong>{tourData.category}</strong>
                                </h4>
                                <h4 className={styles.priceBox}>
                                    Price:&nbsp;
                                    {tourData?.discount && tourData.discount > 0 ? (
                                        <>
                                            <strong>{formatPrice(discountPrice)}</strong>&nbsp;
                                            <span className={styles.offPrice}>{tourData.discount}% off</span>
                                            <span className={styles.priceLine}>
                                                {formatPrice(tourData.price)}
                                            </span>
                                        </>
                                    ) : (
                                        <strong>{formatPrice(tourData.price)}</strong>
                                    )}
                                </h4>
                                {
                                    tourData.startDate === "" ? null :
                                        <>
                                            <h4>
                                                Last&nbsp;date&nbsp;to&nbsp;Book:&nbsp;<strong>{date5DaysBack}</strong>
                                            </h4>
                                            <h4>
                                                Departure&nbsp;Date:&nbsp;<strong>{tourData.startDate}</strong>
                                            </h4>
                                        </>
                                }
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
                    {
                        // showBookingForm ? (
                        <BookingForm tour={tourData} isPastDate={isPastDate} discountPrice={discountPrice} />
                        // ) : (
                        //     <BookingLoding />
                        // )
                    }
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
