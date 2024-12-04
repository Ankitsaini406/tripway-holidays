'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import LoadingSpinner from '@/utils/lodingSpinner';
import { useSingleTourData } from '@/hook/useSingleTour';
import useTourUserData from '@/hook/useTourUserData';
import styles from '@/styles/pages/tourDetails.module.css';
import style from '@/styles/pages/authpage.module.css';
import { toast } from 'react-toastify';

function TourDetails() {

    const { id } = useParams();
    const imageUrl = process.env.IMAGE_URL;
    const { tour, singleLoading } = useSingleTourData(`group-tours/${id}`);
    const router = useRouter();
    const { addTourData, userData, loading, error, success } = useTourUserData();
    const [formData, setFormData] = useState({
        userFrom: '',
        passenger: 1,
        userPhoneNumber: userData?.phoneNumber || '',
        userEmail: userData?.email || '',
        userName: userData?.name || '',
    });
    const [isPastDate, setIsPastDate] = useState(false);

    function getDateBack(startDate, daysBack) {
        const date = new Date(startDate);
        date.setDate(date.getDate() - daysBack);
        return formatDate(date);
    }
    
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    
    const date5DaysBack = getDateBack(tour?.startDate, 5);
    
    useEffect(() => {
        if (date5DaysBack) {
            const parsedDate5DaysBack = new Date(date5DaysBack);
            const today = new Date();
            
            // Strip out the time component from both dates
            const dateOnlyParsedDate = new Date(parsedDate5DaysBack.setHours(0, 0, 0, 0));
            const dateOnlyToday = new Date(today.setHours(0, 0, 0, 0));
    
            // Compare dates without time
            const isPast = dateOnlyParsedDate < dateOnlyToday;
            setIsPastDate(isPast);
        }
    }, [tour]);

    useEffect(() => {
        if (success) toast.success(success, {
            draggable: true,
            closeOnClick: true,
        });
        if (error) toast.error(error, {
            draggable: true,
            closeOnClick: true,
        });
    }, [success, error]);

    useEffect(() => {
        if (userData) {
            setFormData({
                userFrom: '',
                passenger: '',
                userPhoneNumber: userData.phoneNumber || '',
                userEmail: userData.email || '',
                userName: userData.name || '',
            });
        }
    }, [userData]);

    const handleAddTourData = async (e) => {
        e.preventDefault();
        if (!userData) return router.push('/auth/client-login');
        try {
            const data = { ...formData, tourName: tour.name, price: tour.price, tourDate: tour.startDate, isPast: isPastDate };
            await addTourData(data);
        } catch (error) {
            console.error("Error adding tour data:", error);
        }
    }

    return (
        <div className="layout">
            {
                singleLoading ? <LoadingSpinner /> :
                    tour ? (<div className={styles.tourBox}>
                        <div className={styles.tourdetails}>
                            <div className={styles.tourdetailsBox}>
                                <div className={`${styles.tourdetailsImg}`}>
                                    <Image
                                        className={styles.tourImg}
                                        data-src={`${imageUrl}${tour.imageUrl}`}
                                        src={`${imageUrl}${tour.imageUrl}`}
                                        alt={tour.name}
                                        placeholder="blur"
                                        blurDataURL={`${imageUrl}${tour.imageUrl}`}
                                        width={1600}
                                        height={900}
                                    />
                                </div>
                                <div className={styles.tourdetailsText}>
                                    <h2>{tour.name}</h2>
                                    <h4>Category: {tour.category}</h4>
                                    <h4>&#8377;&nbsp;{tour.price}</h4>
                                    <h4>Last&nbsp;date&nbsp;to&nbsp;Book:&nbsp;{date5DaysBack}</h4>
                                    <h4>Departure&nbsp;Date:&nbsp;{tour.startDate}</h4>
                                    <p>{tour.description}</p>
                                </div>
                            </div>
                            <div className={styles.tourdetailsInfo}>
                                Trip Details
                            </div>
                        </div>
                        <div className={styles.bookingFrom}>
                            <h1>Booking Form</h1>
                            <h2>{tour.name}</h2>
                            <form>
                                {isPastDate && <p className='errorMsg'>*Sorry! This tour is currently unavailable for booking. We plan to offer it again within the next 30 days. Fill in your details below to receive a notification when bookings reopen!.</p>}
                                <div className={style.formGroup}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        className={style.authInput}
                                        type="text"
                                        id="name"
                                        value={formData.userName || ''}
                                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                        placeholder={userData ? '' : 'Enter your Name'}
                                        required
                                    />
                                </div>
                                {
                                    !isPastDate && <div className={style.formGroup}>
                                        <label htmlFor="from">From</label>
                                        <input
                                            className={style.authInput}
                                            type="text"
                                            id="from"
                                            value={formData.userFrom || ''}
                                            onChange={(e) => setFormData({ ...formData, userFrom: e.target.value })}
                                            placeholder={'Enter your Location'}
                                            required
                                        />
                                    </div>
                                }
                                <div className={style.formGroup}>
                                    <label htmlFor="phonenumber">Phone Number</label>
                                    <input
                                        className={style.authInput}
                                        type="text" inputMode="numeric"
                                        pattern="[0-9]+"
                                        id="phoneNumber"
                                        value={formData.userPhoneNumber || ''}
                                        onChange={(e) => setFormData({ ...formData, userPhoneNumber: e.target.value })}
                                        placeholder={userData ? '' : 'Enter your Phone Number'}
                                        required
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className={style.authInput}
                                        type="email"
                                        id="email"
                                        value={formData.userEmail || ''}
                                        onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                                        placeholder={userData ? '' : 'Enter your Email'}
                                        required
                                    />
                                </div>
                                {
                                    !isPastDate && <div className={style.formGroup}>
                                        <label htmlFor="passenger">Passengers</label>
                                        <input
                                            className={style.authInput}
                                            type="number"
                                            id="passenger"
                                            value={formData.passenger || ''}
                                            onChange={(e) => setFormData({ ...formData, passenger: e.target.value })}
                                            placeholder="Enter number of passengers"
                                            required
                                        />
                                    </div>
                                }
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button className={` ${loading ? 'loadingButton' : styles.tourBuybutton}`} onClick={loading ? null : handleAddTourData} type="submit" disabled={loading}>
                                        {loading ? 'Submitting...' : isPastDate ? 'Submit Details' : 'Book Now'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    ) : <p>Tour data not available</p>
            }
        </div>
    );
}

export default TourDetails;
