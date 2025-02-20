"use client";

import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { ContactDetails } from "@/utils/Utils";
import { useClient } from "@/context/UserContext";
import OtpVerification from "@/utils/otpVeriification";
import useCabSearchForm from "@/hook/useCabSerachForm";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/styles/pages/cabs.module.css";
import Testimonials from "@/components/testimonials";

export default function OneWayComponent() {

    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, activeOtp, correctOtp, options, setFormData, handleChange, handleSendOtp, handleSubmit, setEnteredOtp } = useCabSearchForm(user, signupUserWithEmailAndPassword);

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
                        </div>
                    </div>
                    <Testimonials category='one-way' />
                </div>
            </div>
        </>
    )
}