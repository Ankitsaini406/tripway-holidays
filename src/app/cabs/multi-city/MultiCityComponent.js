"use client";

import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useClient } from "@/context/UserContext";
import useCabSearchForm from "@/hook/useCabSerachForm";
import { PiNumberZero, PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { GrDirections } from "react-icons/gr";
import { RiCloseLine } from 'react-icons/ri';
import { BiCabinet, BiCableCar, BiHome, BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/styles/pages/cabs.module.css";
import Testimonials from "@/components/testimonials";
import { MdPayment, MdPriceCheck, MdSafetyCheck } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import FaqDropdown from "@/components/FaqDropdown";
import WhyChooseUs from "@/components/WhyChooseUs";
import Link from "next/link";

export default function MultiCityComponent() {

    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, fromOptions, inputValue, tags, setFormData, handleChange, handleInputChange, removeTag, handleMultiCityChange, addDestination, handleKeyDown, removeDestination } = useCabSearchForm(user, signupUserWithEmailAndPassword);

    const whyChooseUs = [
        {
            title: 'Easy Booking',
            description: 'We offer quick and hassle-free booking with attractive offers and a user-friendly interface.',
            icons: <PiTrainLight />,
        },
        {
            title: 'Lowest Price',
            description: 'Enjoy affordable rates for hotels, buses, tours and holiday packages.',
            icons: <IoPricetagOutline />,
        },
        {
            title: 'Exciting Deals',
            description: 'Avail deals on buses, hotels, car rentals and tour packages with exclusive offers.',
            icons: <BiSolidOffer />,
        },
        {
            title: '24/7 Support',
            description: 'Get round-the-clock assistance for any travel queries. We are here to help.',
            icons: <BiSupport />,
        },
        {
            title: 'Assured Cab Availability',
            description: 'Your booking is confirmed instantly, ensuring a stress-free journey.',
            icons: <BiCableCar />,
        },
        {
            title: 'Transparent Pricing',
            description: 'Get detailed fare breakdowns, including toll tax and service fees, before booking.',
            icons: <MdPriceCheck />,
        },
        {
            title: 'Dedicated Cab',
            description: 'Enjoy a private, comfortable cab all to yourself.',
            icons: <BiCabinet />,
        },
        {
            title: 'Home Pickup & Drop',
            description: 'Convenient door-to-door pickup and drop, including airport transfers.',
            icons: <BiHome />,
        },
        {
            title: 'Safe & Comfortable Rides',
            description: 'Well-maintained and sanitized cabs with premium service quality.',
            icons: <MdSafetyCheck />,
        },
        {
            title: 'Zero Cancellation Charges',
            description: 'Change of plans? Cancel without any additional fees if done within 48 hours.',
            icons: <PiNumberZero />,
        },
        {
            title: 'Multiple Payment Options',
            description: 'Pay via cash, credit/debit cards, Paytm, or other UPI payment methods.',
            icons: <MdPayment />,
        },
        {
            title: 'Best-Rated Drivers',
            description: 'Professionally trained and verified drivers ensuring a safe journey.',
            icons: <FaUsers />,
        },
    ]

    const faqData = [
        { question: '1. What is One Way Cab Service?', answer: 'One Way Cab Service allows you to book a taxi for a single trip without paying round-trip fares. It is a cost-effective way to travel intercity without unnecessary extra charges.' },
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
            <div className="heroSection">
                <div className="overlay"></div>
                <Image className="heroImage" src="/slider/slider2.webp" fill alt="Group Tour Image" />
                <h1 className="heroText">
                    Multi City
                </h1>
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
                        description='Are you tired of paying for both sides of your journey when traveling one way? One Way Cab is India’s leading intercity cab service provider, allowing you to pay only for the distance you travel. Now, travel one-way without extra charges and enjoy a seamless experience with our reliable cab services.'
                        whyChooseUs={whyChooseUs}
                    />

                    <FaqDropdown faqData={faqData} />

                    <Testimonials category='Multi City' />
                </div>
            </div>
        </>
    )
}