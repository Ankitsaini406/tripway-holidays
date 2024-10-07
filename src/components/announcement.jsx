
import React from "react";
import Marquee from "react-fast-marquee";
import '../styles/components/announcement.css';

const Announcement = () => {
    return (
        <div className="announcement">
            <Marquee gradient = {false} speed={90}>
                <div>
                    30% off on trip
                </div>
            </Marquee>
        </div>
    )
}

export default Announcement;
