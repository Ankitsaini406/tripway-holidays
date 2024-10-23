import React, { useState, useEffect } from 'react';
import '../styles/components/header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsAnimating(true);
        } else {
            setIsMenuOpen(true);
        }
    };

    const handleTourClick = (e) => {
        e.preventDefault();
        const targetSection = document.getElementById('tourSection');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/tour');
        }
    }

    const handleGroupTourClick = (e) => {
        e.preventDefault();
        const targetSection = document.getElementById('groupTour');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/group-tour');
        }
    }

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
                        <Link to='/'>
                            <li className={`header-name ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => setActiveItem('Home')}>Home</li>
                        </Link>
                        <Link to='#tourSection' onClick={handleTourClick}>
                            <li className={`header-name ${activeItem === 'Tours' ? 'active' : ''}`} onClick={() => setActiveItem('Tours')}>Tours</li>
                        </Link>
                        <Link to='#groupTour' onClick={handleGroupTourClick}>
                            <li className={`header-name ${activeItem === 'Group' ? 'active' : ''}`} onClick={() => setActiveItem('Group')}>Group</li>
                        </Link>
                        <Link to='/about'>
                            <li className={`header-name ${activeItem === 'About' ? 'active' : ''}`} onClick={() => setActiveItem('About')}>About</li>
                        </Link>
                        <li className={`header-name ${activeItem === 'Contact' ? 'active' : ''}`} onClick={() => setActiveItem('Contact')}>Contact Us</li>
                        <button className='header-button'>Login</button>
                    </ul>
                </div>

                {isMenuOpen && <div className='overlay' onClick={toggleMenu}>
                    <div className={`header-items mobile ${isMenuOpen ? 'open' : ''}`}>
                        <ul className='header-list'>
                            <Link to='/'>
                                <li className={`header-name ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => setActiveItem('Home')}>Home</li>
                            </Link>
                            <Link to='#tourSection' onClick={handleTourClick}>
                                <li className={`header-name ${activeItem === 'Tours' ? 'active' : ''}`} onClick={() => setActiveItem('Tours')}>Tours</li>
                            </Link>
                            <Link to='#groupTour' onClick={handleGroupTourClick}>
                                <li className={`header-name ${activeItem === 'Group' ? 'active' : ''}`} onClick={() => setActiveItem('Group')}>Group</li>
                            </Link>
                            <Link to='/about'>
                                <li className={`header-name ${activeItem === 'About' ? 'active' : ''}`} onClick={() => setActiveItem('About')}>About</li>
                            </Link>
                            <li className={`header-name ${activeItem === 'Contact' ? 'active' : ''}`} onClick={() => setActiveItem('Contact')}>Contact Us</li>
                            <button className='header-button'>Login</button>
                        </ul>
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default Header;
