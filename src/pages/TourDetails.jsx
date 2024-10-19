import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpiner from '../components/loadingSpiner';
import "../styles/pages/layout.css";
import "../styles/pages/tourDetails.css"

function TourDetails() {
    const { id } = useParams(); // Extract the id from the URL
    const [tour, setTour] = useState(null);

    // Fetch tour data based on the id
    useEffect(() => {

        const fetchTour = async () => {
            try {
                const response = await axios.get("http://localhost:3000/data/tour-data.json");
                const tourData = response.data.find((item) => item.id === parseInt(id));
                setTour(tourData);
            } catch (error) {
                console.error("Error fetching tour details:", error);
            }
        };
        fetchTour();
    }, [id]);

    return (
        <div className="layout">
            {
                !tour ? <LoadingSpiner /> :
                    <div className='tourdetails'>
                        <div className='tourdetails-box'>
                            <img className='tourdetails-img' src={tour.img} alt={tour.title} />
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
