'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import styles from '../styles/components/header.module.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useClient();
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleGroupTourClick = (e) => {
        e.preventDefault();
        const targetSection = document.getElementById('groupTour');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/group-tour');
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link href="/">
                        <h1>TripWay&nbsp;Holidays</h1>
                    </Link>
                </div>

                <div
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    role="button"
                    tabIndex={0}
                >
                    {isMenuOpen ? 'X' : '☰'}
                </div>

                <nav
                    className={`${styles.desktop} ${isMenuOpen ? styles.open : styles.closed
                        }`}
                >
                    <ul className={styles.headerList}>
                        <li>
                            <Link href="/" className={styles.headerName}>Home</Link>
                        </li>
                        <li>
                            <a href="#groupTour" onClick={handleGroupTourClick} className={styles.headerName}>
                                Group Tours
                            </a>
                        </li>
                        <li>
                            <Link href="/about" className={styles.headerName}>About</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={styles.headerName}>Contact</Link>
                        </li>
                        {user ? (
                            <li>
                                <Link href="/profile" className={styles.headerButton}>Profile</Link>
                            </li>
                        ) : (
                            <li>
                                <Link href="/auth/client-login" className={styles.headerButton}>Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {isMenuOpen && (
                    <div className={`${isMenuOpen ? styles.open : styles.close} ${styles.overlay}`} onClick={toggleMenu} role="button" tabIndex={0}>
                        <nav
                            className={`${styles.mobile} ${styles.headeritems} ${isMenuOpen ? styles.open : styles.close}`}
                        >
                            <ul className={styles.headerList}>
                                <li>
                                    <Link href="/" className={styles.headerName}>Home</Link>
                                </li>
                                <li>
                                    <a href="#groupTour" onClick={handleGroupTourClick} className={styles.headerName}>
                                        Group Tours
                                    </a>
                                </li>
                                <li>
                                    <Link href="/about" className={styles.headerName}>About</Link>
                                </li>
                                <li>
                                    <Link href="/contact" className={styles.headerName}>Contact</Link>
                                </li>
                                {user ? (
                                    <li>
                                        <Link href="/profile" className={styles.headerButton}>Profile</Link>
                                    </li>
                                ) : (
                                    <li>
                                        <Link href="/auth/client-login" className={styles.headerButton}>Login</Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
