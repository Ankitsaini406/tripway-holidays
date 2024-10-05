import React, { useState } from 'react';
import '../styles/header.css';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='navbar'>
            <div className='header'>
                <div className='logo'>
                    <h1>TripWay&nbsp;Holidays</h1>
                </div>

                {
                    isMenuOpen ? <div className="hamburger" onClick={toggleMenu}>
                        X
                    </div> : <div className="hamburger" onClick={toggleMenu}>
                        ☰
                    </div>
                }

                <div className={`header-items ${isMenuOpen ? 'open' : ''}`}>
                    <ul className='header-list'>
                        <li>Home</li>
                        <li>Trips</li>
                        <li>About</li>
                        <li>Contact Us</li>
                        <button className='header-button'>Login</button>
                    </ul>
                </div>

                {/* Overlay */}
                {isMenuOpen && <div className='overlay' onClick={toggleMenu}></div>}

            </div>
        </div>
    );
}

export default Header;
