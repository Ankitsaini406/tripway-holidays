import React, { useState, useEffect, useRef } from "react";
import "../styles/pages/home.css";
import Hero from "../components/hero";

function Home() {
    // const [imageIndex, setImageIndex] = useState(0);
    // const [isTransitioning, setIsTransitioning] = useState(true);

    const imageUrls = [
        {
            url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 1",
        },
        {
            url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 2",
        },
        {
            url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 3",
        },
        {
            url: "https://images.unsplash.com/photo-1686127628300-1824272ab27a?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 4",
        },
        {
            url: "https://images.unsplash.com/photo-1595433306946-233f47e4af3a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 5",
        },
        {
            url: "https://images.unsplash.com/photo-1609953886408-70f5f595b2fe?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 6",
        },
        {
            url: "https://images.unsplash.com/photo-1694608217345-75987f889c89?q=80&w=2552&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 7",
        },
        {
            url: "https://images.unsplash.com/photo-1592156386005-ad841f96224a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 8",
        },
        {
            url: "https://images.unsplash.com/photo-1669915746165-232236839501?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 9",
        },
        {
            url: "https://images.unsplash.com/photo-1591122447574-933363c1dc5a?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Nature 10",
        },
    ];

    // Clone images for infinite looping
    const clonedImages = [imageUrls[imageUrls.length - 1], ...imageUrls, imageUrls[0]];
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
        <div className="home">
            <Hero />
            <div className="carousel-container">
                <h3 className="slide-name">Tour Slides</h3>
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
        </div>
    );
}

export default Home;
