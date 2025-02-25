"use client";

import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useClient } from "@/context/UserContext";
import useCabSearchForm from "@/hook/useCabSerachForm";
import { PiNumberZero, } from "react-icons/pi";
import { TiCancelOutline } from "react-icons/ti";
import { GrDirections } from "react-icons/gr";
import { BiHome, BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/styles/pages/cabs.module.css";
import Testimonials from "@/components/testimonials";
import { MdPayment, MdSafetyCheck } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import FaqDropdown from "@/components/FaqDropdown";
import WhyChooseUs from "@/components/WhyChooseUs";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";

export default function MultiCityComponent() {

    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, fromOptions, inputValue, tags, setFormData, handleChange, handleInputChange, removeTag, handleMultiCityChange, addDestination, handleKeyDown, removeDestination } = useCabSearchForm(user, signupUserWithEmailAndPassword);

    const whyChooseUs = [
        {
            title: 'Comfortable & Reliable Transport',
            description: 'Travel in well-maintained, spacious vehicles with professional drivers ensuring a smooth ride.',
            icons: <MdPayment />,
        },
        {
            title: 'Customized Itineraries',
            description: 'Plan your trip the way you want, with tailored routes covering multiple cities of your choice.',
            icons: <FaUsers />,
        },
        {
            title: 'Secure Online Payment',
            description: 'Pay safely through our encrypted online portal using credit/debit cards,UPI, Online Banking.',
            icons: <TiCancelOutline />,
        },
        {
            title: '48-Hour Cancellation Policy',
            description: 'Plans changed? Cancel up to 48 hours in advance for a hassle-free refund or rescheduling.',
            icons: <BiSolidOffer />,
        },
        {
            title: '24/7 Support',
            description: 'Our team is always available to assist you throughout your journey.',
            icons: <BiSupport />,
        },
        {
            title: 'Door-to-Door Service',
            description: 'Get picked up and dropped off at your preferred locations across different cities.',
            icons: <BiHome />,
        },
        {
            title: 'Flexible Scheduling',
            description: ' Choose your departure and return times with flexible options to fit your travel needs.',
            icons: <MdSafetyCheck />,
        },
        {
            title: 'Time & Cost Efficiency',
            description: 'Save money with our budget-friendly round-trip packages that include multiple stops without extra hassle.',
            icons: <PiNumberZero />,
        },
    ]

    const faqData = [
        { question: '1. How do I book a multi-city trip?', answer: 'Simply select your desired cities, customize your schedule, and complete the booking process online or by contacting our customer support team.' },
        { question: '2. How do I book a One Way Cab with TripWay Holidays?', answer: 'You can book your cab easily through our website TripWayHolidays or call our helpline at +91 8890906400 for instant booking assistance.' },
        { question: '3. What are the payment options available?', answer: 'We accept multiple payment options, including cash, credit/debit cards, Paytm, and UPI payments. You can pay at the time of booking or after completing your ride.' },
        { question: '4. Is there any cancellation charge for One Way Cab bookings?', answer: 'No, cancellations within 48 hours are free of charge. If you cancel after this period, minimal charges may apply.' },
        { question: '5. Do you provide airport transfers?', answer: 'Yes, we offer seamless airport pickup and drop services in multiple cities.' },
        { question: '6. How can I track my ride?', answer: 'Our GPS-enabled cabs allow real-time tracking through our app or via SMS link sent after booking confirmation.' },
        { question: '7. Are the drivers verified and trained?', answer: 'Yes, all our drivers are professionally trained, verified, and experienced to ensure a safe and comfortable journey.' },
        { question: '8. Can I schedule a ride in advance?', answer: 'Yes, you can pre-book your ride in advance to ensure cab availability at your preferred time.' },
        { question: '9. Do you offer special discounts or deals?', answer: 'Yes, we frequently offer promotional discounts. Keep checking our website TripWayHolidays for the latest offers.' },
    ];

    return (
        <>
            <div className={styles.heroSection}>
                <div className={styles.overlay}></div>
                <Image
                    className="heroImage"
                    src="/cab/one-way.webp"
                    fill
                    alt="Cab Background"
                />

                <Image
                    className={styles.heroImage}
                    src="/cab/fource.webp"
                    alt="Round trip car"
                    width={450} height={200}
                />
                <Image
                    className={styles.heroImage2}
                    src="/cab/fource.webp"
                    alt="Round trip car"
                    width={450} height={200}
                />
                <h1 className={styles.heroText}>Multi City</h1>
            </div>
            <div className="layout">
                <div>
                    <div className={styles.mainflex}>
                        <div className={styles.flexRedio}>
                            <div className={styles.radioOption}>
                                <select
                                    name="from"
                                    value={formData.from}
                                    onChange={handleChange}
                                    className={styles.searchInput}
                                >
                                    {fromOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className={styles.MdistanceIcon}>
                                    <GrDirections />
                                </div>
                                <div className={styles.tagInputContainer}>
                                    {tags.map((tag, index) => (
                                        <div className={styles.tag} key={index}>
                                            <span>{tag}</span>
                                            <button type="button" onClick={() => removeTag(index)}>
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {tags.length < 10 && (
                                        <input
                                            type="text"
                                            placeholder="Type a city and press Enter"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            className={styles.input}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.radioOption}>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={(date) =>
                                        setFormData((prevData) => ({ ...prevData, startDate: date }))
                                    }
                                    className={styles.searchInput}
                                    placeholderText="Start Date"
                                    required
                                    withPortal
                                />
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className={styles.searchInput}
                                    required
                                />
                            </div>
                        </div>
                        {formData.error && <p className='errorMsg'>{formData.error}</p>}
                        <Link href='/cabs/select-cabs' className={`${formData.loading ? 'loadingButton' : styles.searchButton}`}>
                            EXPLORE CABS
                        </Link>
                    </div>

                    <WhyChooseUs title='Why Choose Multi City Cab?'
                        description="​Experience the freedom to explore multiple destinations with our customizable multi-city cab services. Plan your journey across various cities, and we'll ensure a comfortable and seamless ride tailored to your itinerary."
                        whyChooseUs={whyChooseUs}
                    />

                    <FaqDropdown faqData={faqData} />

                    <Testimonials category='Multi City' />
                </div>
            </div>
        </>
    )
}