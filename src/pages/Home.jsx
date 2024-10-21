import React, { useEffect, useState } from "react";
import Hero from "../components/hero";
import { Link } from "react-router-dom";
import "../styles/pages/home.css";
import "../styles/pages/layout.css";

function Home() {

    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopUp(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showPopUp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showPopUp]);


    const closePopUp = () => {
        setShowPopUp(false);
    }

    return (
        <>
            {
                showPopUp && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Welcome to TripWay Holidays!</h2>
                            <p>Discover amazing travel deals and adventures with us.</p>
                            <button onClick={closePopUp} className="close-button">
                                Close
                            </button>
                        </div>
                    </div>
                )
            }
            <div className="layout">
                <Hero />
                <div className="home-tour" id="tourSection">
                    <div className="home-tour-flex">
                        <img className="tour-img" src="https://images.unsplash.com/photo-1704774041066-ffefb6e950fd?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="a-small-green-building-in-the-middle-of-a-forest" />
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
                        <img className="tour-img" src="https://images.unsplash.com/photo-1576557686977-eda3a3bb1ea2?q=80&w=2576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="multicolored-buntings" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
