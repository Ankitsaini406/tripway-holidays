'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { auth } from '@/firebase/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import styles from '../styles/components/header.module.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const { user } = useClient();
    const router = useRouter();

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsAnimating(true);
        } else {
            setIsMenuOpen(true);
        }
    };

    const handleGroupTourClick = (e) => {
        e.preventDefault();
        const targetSection = document.getElementById('groupTour');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/group-tour');  // Use Next.js router to navigate
        }
    };

    useEffect(() => {

        const headerItems = document.querySelector('.headeritems');
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
        <div className={styles.navbar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link href='/'>
                        <h1>TripWay&nbsp;Holidays</h1>
                    </Link>
                </div>

                {isMenuOpen ? (
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        X
                    </div>
                ) : (
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        ☰
                    </div>
                )}

                <div className={`${styles.desktop}`}>
                    <ul className={styles.headerList}>
                        <li>
                            <Link
                                href='/'
                                className={`${styles.headerName} ${activeItem === 'Home' ? styles.active : ''}`}
                                onClick={() => setActiveItem('Home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='#groupTour'
                                className={`${styles.headerName} ${activeItem === 'Group' ? styles.active : ''}`}
                                onClick={handleGroupTourClick}
                            >
                                Group Tours
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/about'
                                className={`${styles.headerName} ${activeItem === 'About' ? styles.active : ''}`}
                                onClick={() => setActiveItem('About')}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/contact'
                                className={`${styles.headerName} ${activeItem === 'Contact' ? styles.active : ''}`}
                                onClick={() => setActiveItem('Contact')}
                            >
                                Contact
                            </Link>
                        </li>
                        {user ? (
                            <li>
                                <Link href='/profile' className={styles.headerButton}>
                                    Profile
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link href='/auth/client-login' className={styles.headerButton}>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}>
                        <div className={`${styles.headeritems} ${styles.mobile} ${isMenuOpen ? styles.open : ''}`}>
                            <ul className={styles.headerList}>
                                <li>
                                    <Link
                                        href='/'
                                        className={`${styles.headerName} ${activeItem === 'Home' ? styles.active : ''}`}
                                        onClick={() => setActiveItem('Home')}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='#groupTour'
                                        className={`${styles.headerName} ${activeItem === 'Group' ? styles.active : ''}`}
                                        onClick={handleGroupTourClick}
                                    >
                                        Group Tours
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/about'
                                        className={`${styles.headerName} ${activeItem === 'About' ? styles.active : ''}`}
                                        onClick={() => setActiveItem('About')}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/contact'
                                        className={`${styles.headerName} ${activeItem === 'Contact' ? styles.active : ''}`}
                                        onClick={() => setActiveItem('Contact')}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                {user ? (
                                    <li>
                                        <Link href='/profile' className={styles.headerButton}>
                                            Profile
                                        </Link>
                                    </li>
                                ) : (
                                    <li>
                                        <Link href='/auth/client-login' className={styles.headerButton}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;
