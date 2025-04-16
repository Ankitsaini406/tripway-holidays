
import styles from '@/styles/components/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Footer() {
    const router = useRouter();

    const handleNavigation = (e, href) => {
        e.preventDefault();
            router.push(href);
    };

    return (
        <div className={styles.mainFooter}>
            <div className={styles.textOverlay}>
                <div className={styles.footer}>
                    <div className={styles.footerFlex}>
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
                        <h3>Services</h3>
                        <ul className={styles.footerFlexList}>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/blog" onClick={(e) => handleNavigation(e, "/blog")}>Blog</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/group-tour" onClick={(e) => handleNavigation(e, "/group-tour")}>Group Tours</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/cabs/one-way" onClick={(e) => handleNavigation(e, "/cabs/one-way")}>One Way</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/cabs/round-trip" onClick={(e) => handleNavigation(e, "/cabs/round-trip")}>Round Trip</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/cabs/multi-city" onClick={(e) => handleNavigation(e, "/cabs/multi-city")}>Multi City</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerFlex}>
                        <h3>Support</h3>
                        <ul className={styles.footerFlexList}>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/privacy-policy" onClick={(e) => handleNavigation(e, "/privacy-policy")}>Privacy Policy</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/terms-and-condition" onClick={(e) => handleNavigation(e, "/terms-and-condition")}>Terms & Conditions</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/about-us" onClick={(e) => handleNavigation(e, "/about-us")}>About Us</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/contact-us" onClick={(e) => handleNavigation(e, "/contact-us")}>Contact Us</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/return-policy" onClick={(e) => handleNavigation(e, "/return-policy")}>Return Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.footerFlex}>
                        <h3>Links</h3>
                        <ul className={styles.footerFlexList}>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/auth/user/login" onClick={(e) => handleNavigation(e, "/auth/user/login")}>Login</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/auth/user/signup" onClick={(e) => handleNavigation(e, "/auth/user/signup")}>Sign Up</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/auth/agent/login" onClick={(e) => handleNavigation(e, "/auth/agent/login")}>Partner Login</Link></li>
                            <li><Link scroll={false} rel="preload" className={styles.lnkTag} href="/auth/driver/login" onClick={(e) => handleNavigation(e, "/auth/driver/login")}>Driver Login</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;