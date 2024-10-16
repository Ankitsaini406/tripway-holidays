import React from "react";
import "../styles/pages/layout.css";
import '../styles/pages/tourpackges.css';
import TourData from "../lib/tour-data";

function TourPackes () {
    return (
        <div className="layout">
            <div className="tour">
                <div className="filters">
                    <Filters />
                </div>
                <div className="tour-box">
                    <TourCard />
                </div>
            </div>
        </div>
    )
}

export function Filters () {
    return (
        <div className="filters-box">
            <h4>This is filter</h4>
        </div>
    )
}

export function TourCard () {
    return (
        <>
        {
            TourData.map((value) => (
                <div key={value.id} className="tour-card">
                    <img className="tour-image" src={value.img} alt="" srcset="" />
                    <div className="tour-detalis">
                        <h3>{value.title}</h3>
                        <h6>{value.category}</h6>
                        <p>{value.desc}</p>
                        </div>
                </div>
            ))
        }
        </>
    )
}

export default TourPackes;
