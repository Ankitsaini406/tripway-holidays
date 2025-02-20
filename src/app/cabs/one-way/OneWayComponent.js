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

export default function OneWayComponent() {

    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, activeOtp, correctOtp, options, setFormData, handleChange, handleSendOtp, handleSubmit, setEnteredOtp } = useCabSearchForm(user, signupUserWithEmailAndPassword);

    const faqData = [
        { question: '1. What is One Way Cab Service?', answer: 'One Way Cab Service allows you to book a taxi for a single trip without paying round-trip fares. It is a cost-effective way to travel intercity without unnecessary extra charges.' },
        { question: '2. How do I book a One Way Cab with TripWay Holidays?', answer: 'You can book your cab easily through our website TripWayHolidays or call our helpline at 8890906400 for instant booking assistance.' },
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
                <Image className="heroImage" src="/slider/slider4.webp" fill alt="Group Tour Image" />
                <h1 className="heroText">
                    One Way
                </h1>
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
                                        name="to"
                                        placeholder="To"
                                        value={formData.to}
                                        onChange={handleChange}
                                        className={styles.searchInput}
                                        required
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

                    <div className={styles.mainBox}>
                        <h2>Why Choose One Way Cab?</h2>
                        <p>Are you tired of paying for both sides of your journey when traveling one way? One Way Cab is India’s leading intercity cab service provider, allowing you to pay only for the distance you travel. Now, travel one-way without extra charges and enjoy a seamless experience with our reliable cab services.</p>
                        <div className={styles.whyBook}>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><PiTrainLight /></div>
                                <h3>Easy Booking</h3>
                                <p className={styles.whyText}>
                                    We offer quick and hassle-free booking with attractive offers and a user-friendly interface.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><IoPricetagOutline /></div>
                                <h3>Lowest Price</h3>
                                <p className={styles.whyText}>
                                    Enjoy affordable rates for hotels, buses, tours and holiday packages.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiSolidOffer /></div>
                                <h3>Exciting Deals</h3>
                                <p className={styles.whyText}>
                                    Avail deals on buses, hotels, car rentals and tour packages with exclusive offers.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiSupport /></div>
                                <h3>24/7 Support</h3>
                                <p className={styles.whyText}>
                                    Get round-the-clock assistance for any travel queries. We are here to help.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiCableCar /></div>
                                <h3>Assured Cab Availability</h3>
                                <p className={styles.whyText}>
                                    Your booking is confirmed instantly, ensuring a stress-free journey.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><MdPriceCheck /></div>
                                <h3>Transparent Pricing</h3>
                                <p className={styles.whyText}>
                                    Get detailed fare breakdowns, including toll tax and service fees, before booking.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiCabinet /></div>
                                <h3>Dedicated Cab</h3>
                                <p className={styles.whyText}>
                                    Enjoy a private, comfortable cab all to yourself.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><BiHome /></div>
                                <h3>Home Pickup & Drop</h3>
                                <p className={styles.whyText}>
                                    Convenient door-to-door pickup and drop, including airport transfers.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><MdSafetyCheck /></div>
                                <h3>Safe & Comfortable Rides</h3>
                                <p className={styles.whyText}>
                                    Well-maintained and sanitized cabs with premium service quality.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><PiNumberZero /></div>
                                <h3>Zero Cancellation Charges</h3>
                                <p className={styles.whyText}>
                                    Change of plans? Cancel without any additional fees if done within 48 hours.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><MdPayment /></div>
                                <h3>Multiple Payment Options</h3>
                                <p className={styles.whyText}>
                                    Pay via cash, credit/debit cards, Paytm, or other UPI payment methods.
                                </p>
                            </div>
                            <div className={styles.whyBox}>
                                <div className={styles.icons}><FaUsers /></div>
                                <h3>Best-Rated Drivers</h3>
                                <p className={styles.whyText}>
                                    Professionally trained and verified drivers ensuring a safe journey.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ's */}
                    <FaqDropdown faqData={faqData} />

                    <Testimonials category='one-way' />
                </div>
            </div>
        </>
    )
}