import React from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import AdvancedSearchBar from "./advanceserch";
import '../styles/components/hero.css';

const Hero = () => {

    const images = [
        // {
        //     src: 'https://images.unsplash.com/photo-1588356295620-3a53c9e50ba9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        //     title: 'Welcome to Our Travel Service',
        //     caption: 'Welcome to Our Travel Service',
        // },
        // {
        //     src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        //     title: 'Chennai, Tamil Nadu',
        //     caption: 'Chennai, Tamil Nadu',
        // },
        // {
        //     src: 'https://images.unsplash.com/photo-1701523968149-e016f5473362?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        //     title: '3 image',
        //     caption: 'Welcome to Our Travel Service',
        // },
        {
            src: 'https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?q=80&w=2644&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Green Mountain',
            caption: 'India',
        }
    ];

    // const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndex = 0;

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // };

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    // };

    return (
        <div className="hero">
            
            {/* <button className="hero-button prev" onClick={prevSlide}>
                <FaArrowLeft />
            </button> */}
            <div className="hero-image-container">
                <img src={images[currentIndex].src} alt={`Slide ${currentIndex + 1}`} className="hero-image" />
                <div className="hero-title">{images[currentIndex].title}</div>
                <div className="hero-caption">{images[currentIndex].caption}</div>
            </div>
            {/* <button className="hero-button next" onClick={nextSlide}>
                <FaArrowRight />
            </button> */}

            {/* <button className="hero-book-now">Book now</button> */}
            <AdvancedSearchBar />
        </div>
    )
}

export default Hero;
