import React, { useState, useEffect } from 'react';
import '../styles/components/header.css';
import { Link } from 'react-router-dom';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsAnimating(true);
        } else {
            setIsMenuOpen(true);
        }
    };

    useEffect(() => {
        const headerItems = document.querySelector('.header-items');
        const overlay = document.querySelector('.overlay');

        if (isMenuOpen && !isAnimating) {
            headerItems.style.display = 'block';
            overlay.style.display = 'block';
            requestAnimationFrame(() => {
                headerItems.classList.add('open');
                overlay.classList.add('open');
            });
        }

        if (isAnimating) {
            headerItems.classList.remove('open');
            headerItems.classList.add('close');
            overlay.classList.remove('open');
            overlay.classList.add('close');
            headerItems.addEventListener(
                'animationend',
                () => {
                    headerItems.style.display = 'none';
                    headerItems.classList.remove('close');
                    overlay.style.display = 'none';
                    overlay.classList.remove('close');
                    setIsMenuOpen(false);
                    setIsAnimating(false);
                },
                { once: true }
            );
        }
    }, [isMenuOpen, isAnimating]);

    return (
        <div className='navbar'>
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>
                        <h1>TripWay&nbsp;Holidays</h1>
                    </Link>
                </div>

                {
                    isMenuOpen ? <div className="hamburger" onClick={toggleMenu}>
                        X
                    </div> : <div className="hamburger" onClick={toggleMenu}>
                        ☰
                    </div>
                }

                <div className={`desktop ${isMenuOpen ? 'open' : ''}`}>
                    <ul className='header-list'>
                        <li>Home</li>
                        <Link to='/tour'>
                            <li>Tours</li>
                        </Link>
                        <li>About</li>
                        <li>Contact Us</li>
                        <button className='header-button'>Login</button>
                    </ul>
                </div>

                {isMenuOpen && <div className='overlay' onClick={toggleMenu}>
                    <div className={`header-items mobile ${isMenuOpen ? 'open' : ''}`}>
                        <ul className='header-list'>
                            <li>Home</li>
                            <Link to='/tour'>
                                <li>Tours</li>
                            </Link>
                            <li>About</li>
                            <li>Contact Us</li>
                            <button className='header-button'>Login</button>
                        </ul>
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default Header;
