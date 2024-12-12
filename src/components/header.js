'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import styles from '../styles/components/header.module.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useClient();
    const router = useRouter();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const handleGroupTourClick = (e) => {
        e.preventDefault();
        const targetSection = document.getElementById('groupTour');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            closeMenu();
        } else {
            router.push('/group-tour');
            closeMenu();
        }
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Link href="/">TripWay&nbsp;Holidays</Link>
                </div>
                <div
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    role="button"
                    tabIndex={0}
                >
                    {isMenuOpen ? 'X' : '☰'}
                </div>
                {isMenuOpen && (
                    <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu}></div>
                )}
                <nav className={`${styles.desktop} ${styles.headeritems}`}>
                    <ul className={styles.headerList}>
                        {/* <li><Link href="/" className={styles.headerName}>Home</Link></li> */}
                        <li><Link href="#groupTour" onClick={handleGroupTourClick} className={styles.headerName}>Group&nbsp;Tours</Link></li>
                        <li><Link href="/about" className={styles.headerName}>About</Link></li>
                        <li><Link href="/contact" className={styles.headerName}>Contact</Link></li>
                        {user ? (
                            <li><Link href="/profile" className={styles.headerButton}>Profile</Link></li>
                        ) : (
                            <li><Link href="/auth/client-login" className={styles.headerButton}>Login</Link></li>
                        )}
                    </ul>
                </nav>
                <nav className={`${styles.mobile} ${styles.headeritems} ${isMenuOpen ? styles.open : ''}`}>
                    <ul className={styles.headerList}>
                        {/* <li><Link href="/" className={styles.headerName} onClick={closeMenu}>Home</Link></li> */}
                        <li><Link href="#groupTour" onClick={handleGroupTourClick} className={styles.headerName}>Group&nbsp;Tours</Link></li>
                        <li><Link href="/about" className={styles.headerName} onClick={closeMenu}>About</Link></li>
                        <li><Link href="/contact" className={styles.headerName} onClick={closeMenu}>Contact</Link></li>
                        {user ? (
                            <li><Link href="/profile" className={styles.headerButton} onClick={closeMenu}>Profile</Link></li>
                        ) : (
                            <li><Link href="/auth/client-login" className={styles.headerButton} onClick={closeMenu}>Login</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;
