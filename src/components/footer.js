import React from 'react';
import styles from '../styles/components/footer.module.css';

function Footer() {

    return (
        <div className={styles.mainFooter}>
            <div className={styles.footer}>
                <div className={styles.footerFlex}>
                    <div style={{ width: '8rem' }}>Quick Links</div>
                    <ul className={styles.footerFlexList}>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className={styles.footerFlex}>
                    <div style={{ width: '8rem' }}>
                        Programs
                    </div>
                    <ul className={styles.footerFlexList}>
                        <li>Cabs</li>
                        <li>Tour Packages</li>
                        <li>Group Tour</li>
                    </ul>
                </div>
                <div className={styles.footerFlex}>
                    <div style={{ width: '8rem' }}>
                        Get In Touch
                    </div>
                    <div className={styles.footerFlexList}>
                        Near Chandpool gate, Sikar, Rajasthan
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
