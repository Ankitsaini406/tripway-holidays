'use client';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/utils/lodingSpinner';
import LazyLoadImage from '@/utils/lazyLoadingImage';
import { useSingleTourData } from '@/hook/useSingleTour';
import styles from '@/styles/pages/tourDetails.module.css';

function TourDetails() {

    const { id } = useParams();

    const { tour, singleLoading } = useSingleTourData(`/group-tours/${id}`);

    return (
        <div className="layout">
            {
                singleLoading ? <LoadingSpinner /> :
                    tour ? ( // Check if `tour` exists before rendering its properties
                        <div className={styles.tourdetails}>
                            <div className={styles.tourdetailsBox}>
                                <LazyLoadImage className={styles.tourdetailsImg} src={`https://tripwayholidays.in/tour-image/${tour.imageUrl}`} alt={tour.name} imageLength={0} />
                                <div className={styles.tourdetailsText}>
                                    <h2>{tour.name}</h2>
                                    <h4>Category: {tour.category}</h4>
                                    <h4>&#8377;&nbsp;{tour.price}</h4>
                                    <p>{tour.desc}</p>
                                    <button className={styles.tourBuybutton}>Buy Now</button>
                                </div>
                            </div>
                            <div className={styles.tourdetailsInfo}>
                                Trip Details
                            </div>
                        </div>
                    ) : <p>Tour data not available</p>
            }
        </div>
    );
}

export default TourDetails;