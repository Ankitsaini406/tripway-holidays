import React from "react";
import Hero from "../components/hero";
import { Link } from "react-router-dom";
import "../styles/pages/home.css";
import "../styles/pages/layout.css";

function Home() {

    return (
        <div className="layout">
            <Hero />
            <div className="home-tour" id="tourSection">
                <div className="home-tour-flex">
                <img className="tour-img" src="" alt="" />
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
                <img className="tour-img" src="" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Home;
