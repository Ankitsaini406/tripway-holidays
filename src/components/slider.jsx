import React, {useState, useEffect} from "react";
import '../styles/components/slider.css'

function Slider ({title, imagesUrl}) {

    const clonedImages = [imagesUrl[imagesUrl.length - 1], ...imagesUrl, imagesUrl[0]];
    const [index, setIndex] = useState(1);
    const [transition, setTransition] = useState(true);
    // const intervalRef = useRef(null);

    // useEffect(() => {
    //     // Auto-slide every 3 seconds
    //     intervalRef.current = setInterval(() => {
    //         setIndex((prevIndex) => prevIndex + 1);
    //     }, 3000);
    //     return () => clearInterval(intervalRef.current);
    // }, []);

    useEffect(() => {
        if (index === clonedImages.length - 5) {
            // Disable transition to jump to the first real image
            setTimeout(() => {
                setTransition(false);
                setIndex(1);
            }, 500); // Allow the transition to complete
        }

        if (index === 0) {
            // Disable transition to jump to the last real image
            setTimeout(() => {
                setTransition(false);
                setIndex(clonedImages.length - 6);
            }, 500);
        }

        // Re-enable transition after jump
        if (index > 0 && index < clonedImages.length - 5) {
            setTransition(true);
        }
    }, [index, clonedImages.length]);

    const nextImage = () => {
        setIndex(index + 1);
    };

    const prevImage = () => {
        setIndex(index - 1);
    };

    const updateVisibleImages = () => {
        if (window.innerWidth <= 480) {
            return 2;
        } else if (window.innerWidth <= 768) {
            return 3;
        } else if (window.innerWidth <= 1024) {
            return 5;
        } else {
            return 5;
        }
    };

    const visibleImages = updateVisibleImages();
    const translateValue = - index * (100 / visibleImages);

    return (
        <div className="carousel-container">
                <h3 className="slide-name">{title}</h3>
                <div className="carousel-wrapper">
                    <div
                        className="carousel"
                        style={{
                            transform: `translateX(${translateValue}%)`, // Translate by 1/5 for 5 visible images
                            transition: transition ? "transform 0.5s ease-in-out" : "none",
                        }}
                    >
                        {clonedImages.map((image, i) => (
                            <img
                                key={i}
                                src={image.url}
                                alt={image.alt}
                                className="carousel-image"
                                style={{
                                    width: `calc(100% / ${visibleImages} - 20px)`, // Each image takes up 1/5 of the container minus the gap
                                    margin: "0 15px 0 0", // Add gap between images
                                }}
                            />
                        ))}
                    </div>
                </div>
                <button className="prev-btn" onClick={prevImage}>
                    &#10094;
                </button>
                <button className="next-btn" onClick={nextImage}>
                    &#10095;
                </button>
            </div>
    )
}

export default Slider;