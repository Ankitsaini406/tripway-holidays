import React, { useEffect, useRef } from "react";
import Hero from "../components/hero";
import { Link } from "react-router-dom";
import "../styles/pages/home.css";
import "../styles/pages/layout.css";
import PopUp from "../components/popUp";

function Home() {

    const imageRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            },
            { threshold: 0.1 }
        );

        imageRefs.current.forEach((img) => {
            if (img) observer.observe(img);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>

            <PopUp title='Welcome to TripWay Holidays!'
                content='Discover amazing rides and cabs in tripway holidays.'
                popTime={5000} closeTime={10000}
            />
            <PopUp title='Welcome to TripWay Holidays!'
                content='Discover amazing travel deals and adventures with us.'
                popTime={15000} closeTime={20000}
            />

            <div className="layout">
                <Hero />
                <div className="home-tour" id="tourSection">
                    <div className="home-tour-flex">
                        <img
                            className="tour-img"
                            data-src="https://images.unsplash.com/photo-1704774041066-ffefb6e950fd?q=80&w=2536&auto=format&fit=crop"
                            alt="a-small-green-building-in-the-middle-of-a-forest"
                            ref={(el) => (imageRefs.current[0] = el)}
                            loading="lazy"
                        />
                        <div>
                            <h4>Tour Travel</h4>
                            <p>This is for testing perpose</p>
                            <Link to='/tour'>Read More</Link>
                        </div>
                    </div>
                </div>

                <div className="home-tour" id="groupTour">
                    <div className="home-tour-flex">
                        <div>
                            <h4>Group Travel</h4>
                            <p>This is for testing perpose</p>
                            <Link to='/tour'>Read More</Link>
                        </div>
                        <img
                            className="tour-img"
                            data-src="https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop"
                            alt="multicolored-buntings"
                            ref={(el) => (imageRefs.current[1] = el)}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
