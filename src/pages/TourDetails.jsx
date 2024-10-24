import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import "../styles/pages/layout.css";
import "../styles/pages/tourDetails.css"
import LazyLoadImage from '../components/lazyLoadImage';
import { useSingleTourData } from '../lib/hooks/useSingleTourData';

function TourDetails() {

    const { id } = useParams();
    const {tour, singleLoading } = useSingleTourData("http://localhost:3000/data/tour-data.json", id);

    return (
        <div className="layout">
            {
                singleLoading ? <LoadingSpinner /> :
                    <div className='tourdetails'>
                        <div className='tourdetails-box'>
                            <LazyLoadImage className='tourdetails-img' src={tour.img} alt={tour.title} imageLength={0} />
                            <div className='tourdetails-text'>
                                <h2>{tour.title}</h2>
                                <h4>Category: {tour.category}</h4>
                                <h4>&#8377;&nbsp;{tour.price}</h4>
                                <p>{tour.desc}</p>
                                <button className='tour-buybutton'>Buy Now</button>
                            </div>
                        </div>
                        <div className='tourdetails-info'>
                            Trip Details
                        </div>
                    </div>
            }
        </div>
    );
}

export default TourDetails;
