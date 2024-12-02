'use client';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/utils/lodingSpinner';
import Image from 'next/image';
import { useSingleTourData } from '@/hook/useSingleTour';
import useTourUserData from '@/hook/useTourUserData';
import styles from '@/styles/pages/tourDetails.module.css';

function TourDetails() {

    const { id } = useParams();
    const imageUrl = process.env.IMAGE_URL;
    const { tour, singleLoading } = useSingleTourData(`group-tours/${id}`);
    const { addTourData, loading, error, success } = useTourUserData();

    const handleAddTourData = async (e) => {
        e.preventDefault();
        try {
            const data = {
                tourName: tour.name,
                price: tour.price,
                tourDate: tour.date || '',
                userFrom: '',
                passenger: 5,
            }
            await addTourData(data);
        } catch (error) {

        }
    }

    return (
        <div className="layout">
            {
                singleLoading ? <LoadingSpinner /> :
                    tour ? ( // Check if `tour` exists before rendering its properties
                        <div className={styles.tourdetails}>
                            <div className={styles.tourdetailsBox}>
                                <div className={`lazyImageWrapper ${styles.tourdetailsImg}`}>
                                    <Image
                                        className="lazyImage"
                                        data-src={`${imageUrl}${tour.imageUrl}`}
                                        src={`${imageUrl}${tour.imageUrl}`}
                                        alt={tour.name}
                                        placeholder="blur"
                                        blurDataURL={`${imageUrl}${tour.imageUrl}`}
                                        layout="intrinsic"
                                        width={1600}
                                        height={900}
                                    />
                                </div>
                                <div className={styles.tourdetailsText}>
                                    <h2>{tour.name}</h2>
                                    <h4>Category: {tour.category}</h4>
                                    <h4>&#8377;&nbsp;{tour.price}</h4>
                                    <p>{tour.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button onClick={handleAddTourData} className={styles.tourBuybutton}>Buy Now</button>
                                    </div>
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
