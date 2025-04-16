'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';
import styles from '@/styles/components/header.module.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCabsDropdownOpen, setIsCabsDropdownOpen] = useState(false);
    const [isMobileCabsDropdownOpen, setIsMobileCabsDropdownOpen] = useState(false);
    const [hideNavbar, setHideNavbar] = useState(false);
    const { user } = useClient();
    const router = useRouter();

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsMobileCabsDropdownOpen(false);
    }

    const toggleMobileCabsDropdown = () => {
        setIsMobileCabsDropdownOpen((prev) => !prev);
    };

    const handleNavigation = (e, href) => {
        e.preventDefault();
        closeMenu(); // Close the mobile menu first
        setTimeout(() => {
            router.push(href);
        }, 300); // Delay navigation slightly (300ms) to allow menu close animation
    };

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                setHideNavbar(true);
            } else {
                setHideNavbar(false);
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={`${styles.navbar} ${hideNavbar ? styles.hide : ''}`}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <Link scroll={false} href="/" onClick={(e) => handleNavigation(e, "/")}>
                            Tripway&nbsp;Holidays
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
                    {isMenuOpen && (
                        <div className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu}></div>
                    )}
                    <nav className={`${styles.desktop} ${styles.headeritems}`}>
                        <ul className={styles.headerList}>
                            <li className={styles.dropdownContainer}
                                onMouseEnter={() => setIsCabsDropdownOpen(true)}
                                onMouseLeave={() => setIsCabsDropdownOpen(false)}>
                                <Link scroll={false} href="#" className={styles.headerName}>Cabs</Link>
                                {isCabsDropdownOpen && (
                                    <ul className={styles.dropdown}>
                                        <li><Link scroll={false} href="/cabs/one-way" onClick={(e) => handleNavigation(e, "/cabs/one-way")}>One Way</Link></li>
                                        <li><Link scroll={false} href="/cabs/round-trip" onClick={(e) => handleNavigation(e, "/cabs/round-trip")}>Round Trip</Link></li>
                                        <li><Link scroll={false} href="/cabs/multi-city" onClick={(e) => handleNavigation(e, "/cabs/multi-city")}>Multi City</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li><Link scroll={false} href="/group-tour" className={styles.headerName} onClick={(e) => handleNavigation(e, "/group-tour")}>Group&nbsp;Tours</Link></li>
                            <li><Link scroll={false} href="/blog" className={styles.headerName} onClick={(e) => handleNavigation(e, "/blog")}>Blog</Link></li>
                            <li><Link scroll={false} href="/about-us" className={styles.headerName} onClick={(e) => handleNavigation(e, "/about-us")}>About</Link></li>
                            <li><Link scroll={false} href="/contact-us" className={styles.headerName} onClick={(e) => handleNavigation(e, "/contact-us")}>Contact</Link></li>
                            {user ? (
                                <li><Link scroll={false} href="/profile" className={styles.headerButton} onClick={(e) => handleNavigation(e, "/profile")}>Profile</Link></li>
                            ) : (
                                <li><Link scroll={false} href="/auth/user/login" className={styles.headerButton} onClick={(e) => handleNavigation(e, "/auth/user/login")}>Login</Link></li>
                            )}
                        </ul>
                    </nav>
                    <nav className={`${styles.mobile} ${styles.headeritems} ${isMenuOpen ? styles.open : ''}`}>
                        <ul className={styles.headerList}>
                            <li className={styles.dropdownContainer}>
                                <Link scroll={false} href="#" className={styles.headerName} onClick={(e) => {
                                    e.preventDefault();
                                    toggleMobileCabsDropdown();
                                }}>
                                    Cabs {isMobileCabsDropdownOpen ? '▲' : '▼'}
                                </Link>
                                {isMobileCabsDropdownOpen && (
                                    <ul className={styles.dropdown}>
                                        <li><Link scroll={false} href="/cabs/one-way" onClick={(e) => handleNavigation(e, "/cabs/one-way")}>One Way</Link></li>
                                        <li><Link scroll={false} href="/cabs/round-trip" onClick={(e) => handleNavigation(e, "/cabs/round-trip")}>Round Trip</Link></li>
                                        <li><Link scroll={false} href="/cabs/multi-city" onClick={(e) => handleNavigation(e, "/cabs/multi-city")}>Multi City</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li><Link scroll={false} href="/group-tour" onClick={(e) => handleNavigation(e, "/group-tour")} className={styles.headerName}>Group&nbsp;Tours</Link></li>
                            <li><Link scroll={false} href="/blog" className={styles.headerName} onClick={(e) => handleNavigation(e, "/blog")}>Blog</Link></li>
                            <li><Link scroll={false} href="/about-us" className={styles.headerName} onClick={(e) => handleNavigation(e, "/about-us")}>About</Link></li>
                            <li><Link scroll={false} href="/contact-us" className={styles.headerName} onClick={(e) => handleNavigation(e, "/contact-us")}>Contact</Link></li>
                            {user ? (
                                <li><Link scroll={false} href="/profile" className={styles.headerButton} onClick={(e) => handleNavigation(e, "/profile")}>Profile</Link></li>
                            ) : (
                                <li><Link scroll={false} href="/auth/user/login" className={styles.headerButton} onClick={(e) => handleNavigation(e, "/auth/user/login")}>Login</Link></li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Header;
