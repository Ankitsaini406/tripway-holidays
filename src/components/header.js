'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../styles/components/header.module.css';
import { useRouter } from 'next/navigation';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const [user, setUser] = useState(null);
    const router = useRouter();

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
            router.push('/tour');  // Use Next.js router to navigate
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

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

                <div className={`${styles.desktop} ${isMenuOpen ? styles.open : ''}`}>
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
                                href='#tourSection'
                                className={`${styles.headerName} ${activeItem === 'Tours' ? styles.active : ''}`}
                                onClick={handleTourClick}
                            >
                                Tours
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='#groupTour'
                                className={`${styles.headerName} ${activeItem === 'Group' ? styles.active : ''}`}
                                onClick={handleGroupTourClick}
                            >
                                Group
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
                                <Link href='/logout' className={styles.headerButton}>
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link href='/login' className={styles.headerButton}>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`}></div>
        </div>
    );
}

export default Header;
