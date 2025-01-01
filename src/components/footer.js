import React from 'react';
import styles from '@/styles/components/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {

    return (
        <div className={styles.mainFooter}>
            {/* <div className={styles.imageContainer}> */}
            {/* <Image
                    src='/footer.webp'
                    alt='footer'
                    fill
                    loading="lazy"
                    style={{ objectFit: 'fill' }}
                /> */}
            <div className={styles.textOverlay}>
                <div className={styles.footer}>
                    <div className={styles.footerFlex}>
                        {/* <Image src='/favicon.ico'
                                alt='Tripway Holidays'
                                width={100}
                                height={100}
                                className={styles.logo}
                            /> */}
                        <h3>Follow Us</h3>
                        <div className={styles.scoialLinks}>
                            <Link href="https://www.instagram.com/tripwayholiday" target="_blank">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                    alt="Instagram"
                                    width={100}
                                    height={100}
                                    loading='lazy'
                                />
                            </Link>
                            <Link href="https://www.facebook.com/tripwayholidays" target="_blank">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png"
                                    alt="Facebook"
                                    width={100}
                                    height={100}
                                    loading='lazy'
                                />
                            </Link>
                            <Link href="https://www.youtube.com/@tripwayholidays" target="_blank">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                                    alt="You Tube"
                                    width={100}
                                    height={100}
                                    loading='lazy'
                                />
                            </Link>
                            <Link href="https://x.com/tripwayholidays" target="_blank">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg"
                                    alt="Twitter"
                                    width={100}
                                    height={100}
                                    loading='lazy'
                                />
                            </Link>
                        </div>
                        <div className={styles.getInTouch}>
                            <h4>Copyright © 2024 TripWay Holidays. Developed and Managed by Eduengine Technologies Pvt. Ltd.</h4>
                        </div>
                    </div>

                    <div className={styles.footerFlex}>
                        <h3>Useful Links</h3>
                        <ul className={styles.footerFlexList}>
                            <li>
                                <Link rel="preload" className={styles.lnkTag} href='/'>Home</Link>
                            </li>
                            <li><Link rel="preload" className={styles.lnkTag} href='/auth/signup'>Sign Up</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href='/auth/client-login'>Login</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href='#cabs'>Cabs</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href='/group-tour'>Group Tours</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerFlex}>
                        <h3>Support</h3>
                        <ul className={styles.footerFlexList}>
                            <li><Link rel="preload" className={styles.lnkTag} href='/privacy_policy'>Pricay policy</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href='/terms_and_condition'>Trems & Condition</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href="/about_us" >About Us</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href='/contact_us'>Contact Us</Link></li>
                            <li><Link rel="preload" className={styles.lnkTag} href='/return_policy'>Return Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}

export default Footer;
