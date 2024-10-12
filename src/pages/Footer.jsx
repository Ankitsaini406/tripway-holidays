import React from "react";
import '../styles/pages/footer.css'

function Footer() {
    return (
        <div className="main-footer">
            <div className="footer">
                <div className="footer-flex">
                    <div style={{ width: '8rem' }}>Quick Links</div>
                    <ul className="footer-flex-list">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="footer-flex">
                    <div style={{ width: '8rem' }}>
                        Programs
                    </div>
                    <ul className="footer-flex-list">
                        <li>Cabs</li>
                        <li>Tour Packges</li>
                        <li>Group Tour</li>
                    </ul>
                </div>
                <div className="footer-flex">
                    <div style={{ width: '8rem' }}>
                        Get In Touch
                    </div>
                    <div className="footer-flex-list">
                        Near Chandpool gate, Sikar, Rajsthan
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;