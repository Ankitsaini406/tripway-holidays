"use client";

import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { ContactDetails } from "@/utils/Utils";
import { useClient } from "@/context/UserContext";
import OtpVerification from "@/utils/otpVeriification";
import useCabSearchForm from "@/hook/useCabSerachForm";
import { PiNumberZero, PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiCabinet, BiCableCar, BiHome, BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/styles/pages/cabs.module.css";
import Testimonials from "@/components/testimonials";
import { MdPayment, MdPriceCheck, MdSafetyCheck } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import FaqDropdown from "@/components/FaqDropdown";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function RoundTripComponent() {

    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, activeOtp, correctOtp, options, setFormData, handleChange, handleSendOtp, handleSubmit, setEnteredOtp } = useCabSearchForm(user, signupUserWithEmailAndPassword);

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
        { question: '1. What is Round Trip Cab Service?', answer: 'Round Trip Cab Service allows you to book a taxi for a complete journey to and from your destination without worrying about return availability. It ensures a seamless travel experience with cost-effective pricing.' },
        { question: '2. How do I book a Round Trip Cab with TripWayHolidays?', answer: 'You can book your cab easily through our website TripWayHolidays or call our helpline at +91 8002207427 for instant booking assistance.' },
        { question: '3. What are the payment options available?', answer: 'We accept multiple payment options, including cash, credit/debit cards, Paytm, and UPI payments. You can pay at the time of booking or after completing your ride.' },
        { question: '4. Is there any cancellation charge for Round Trip Cab bookings?', answer: 'No, cancellations within 48 hours are free of charge. If you cancel after this period, minimal charges may apply.' },
        { question: '5. Do you provide airport transfers?', answer: 'Yes, we offer airport pickup and drop services with round-trip cab bookings.' },
        { question: '6. How can I track my ride?', answer: 'Our GPS-enabled cabs allow real-time tracking through our app or via SMS link sent after booking confirmation.' },
        { question: '7. Are the drivers verified and trained?', answer: 'Yes, all our drivers are professionally trained, verified, and experienced to ensure a safe and comfortable journey.' },
        { question: '8. Can I schedule a ride in advance?', answer: 'Yes, you can pre-book your ride in advance to ensure cab availability at your preferred time.' },
        { question: '9. Do you offer special discounts or deals?', answer: 'Yes, we frequently offer promotional discounts. Keep checking our website TripWayHolidays for the latest offers.' },
    ];

    return (
        <>
<div className={styles.heroSection}>
                <div className="overlay"></div>
                <Image
                    className="heroImage"
                    src="/cab/one-way.webp"
                    fill
                    alt="Cab Background"
                />
                
                <Image
                    className={styles.heroImage}
                    src="/cab/car.webp"
                    alt="Round trip car"
                    width={450} height={200}
                />
                <Image
                    className={styles.heroImage2}
                    src="/cab/car.webp"
                    alt="Round trip car"
                    width={450} height={200}
                />
                <h1 className={styles.heroText}>Round Trip</h1>
            </div>
            <div className="layout">
                <div>
                    <div>
                        {activeOtp ? (
                            <div>
                                <label style={{ display: 'block', margin: '0 0 15px 0' }} htmlFor="otp">Your OTP for Travel Booking Confirmation</label>
                                <OtpVerification numberOfDigits={6} correctOtp={correctOtp} setEnteredOtp={setEnteredOtp} handleSendOtp={handleSendOtp} />
                                {formData.msg && <p className='errorMsg'>{formData.msg}</p>}
                            </div>
                        ) : (
                            <div className={styles.inputFlex}>
                                <div className={styles.radioOption}>
                                    {["one-way"].map((option) => (
                                        <div key={option} style={{ display: 'none' }}>
                                            <input
                                                name={option}
                                                type="radio"
                                                value={option}
                                                checked={formData.selectedRadio === option}
                                                onChange={() => setFormData((prevData) => ({ ...prevData, selectedRadio: option }))}
                                            />
                                            <label>{option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, "")}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.radioOption}>
                                    <input
                                        type="text"
                                        name="from"
                                        placeholder="From"
                                        value={formData.from}
                                        onChange={handleChange}
                                        className={styles.searchInput}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="destination"
                                        placeholder="Destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className={styles.searchInput}
                                    />
                                </div>

                                <div className={styles.radioOption}>
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={(date) => setFormData((prevData) => ({ ...prevData, startDate: date }))}
                                        className={styles.searchInput}
                                        placeholderText="Start Date"
                                        required
                                    />
                                    <input
                                        style={{ padding: '0.35rem' }}
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className={styles.searchInput}
                                        required
                                    />
                                </div>

                                <div className={styles.radioOption}>
                                    <select
                                        name="carOption"
                                        value={formData.carOption}
                                        onChange={handleChange}
                                        className={styles.searchInput}
                                    >
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        name="passenger"
                                        value={formData.passenger}
                                        onChange={handleChange}
                                        className={styles.searchInput}
                                        min="1"
                                        max="7"
                                        required
                                    />
                                </div>

                                <div className={styles.radioOption}>
                                    <ContactDetails
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        handleChange={handleChange}
                                        className={styles.searchInput}
                                        palceholder='First Name'
                                    />
                                    <ContactDetails
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        handleChange={handleChange}
                                        className={styles.searchInput}
                                        palceholder='Last Name'
                                    />
                                </div>

                                <div className={styles.radioOption}>
                                    <ContactDetails
                                        type='number'
                                        name='phoneNumber'
                                        value={formData.phoneNumber}
                                        handleChange={handleChange}
                                        className={styles.searchInput}
                                        palceholder='Phone Number'
                                    />
                                    <ContactDetails
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        handleChange={handleChange}
                                        className={styles.searchInput}
                                        palceholder='Email'
                                    />
                                </div>

                                <input
                                    type="text"
                                    name="offerFrom"
                                    placeholder="Offer From"
                                    value={formData.offerFrom}
                                    onChange={handleChange}
                                    className={styles.searchInput}
                                />
                            </div>
                        )}
                    </div>

                    {formData.error && <p className='errorMsg'>{formData.error}</p>}

                    <button
                        className={`${formData.loading ? 'loadingButton' : styles.searchButton}`}
                        onClick={
                            formData.loading
                                ? null
                                : activeOtp
                                    ? handleSubmit
                                    : handleSendOtp
                        }
                        type="submit"
                        disabled={formData.loading}
                    >
                        {formData.loading ? 'Submiting...' : activeOtp ? "Submit" : "Book Now"}
                    </button>

                    <WhyChooseUs title='Why Choose Round Trip Cab?'
                        description='Are you tired of paying for both sides of your journey when traveling one way? One Way Cab is India’s leading intercity cab service provider, allowing you to pay only for the distance you travel. Now, travel one-way without extra charges and enjoy a seamless experience with our reliable cab services.'
                        whyChooseUs={whyChooseUs}
                    />

                    <FaqDropdown faqData={faqData} />

                    <Testimonials category='round-trip' />
                </div>
            </div>
        </>
    )
}