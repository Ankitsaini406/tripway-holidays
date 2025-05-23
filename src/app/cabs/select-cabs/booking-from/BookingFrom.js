"use client";

import Breadcrumbs from "@/utils/Breadcrumbs";
import { ContactDetails } from "@/utils/Utils";
import { useClient } from "@/context/UserContext";
import useBookingForm from "@/hook/useBookingForm";
import OtpVerification from "@/utils/otpVeriification";
import styles from "@/styles/pages/selectCabs.module.css";

export default function BookingFrom({ bookingData }) {
    const { user } = useClient();
    const { title, from, to, startDate, time, selectedCar, isNightChargeApplicable, nightCharge, gstAmount, amount, total, distance, formData, correctOtp, isOtpSent, loading, handleChange, handleSendOtp, setEnteredOtp, sendMessage, activeTab, setActiveTab } = useBookingForm(user, bookingData);

    return (
        <div className="layout">
            <Breadcrumbs title={title} />
            <div className={styles.bookingBox}>
                <div className={styles.bookingForm}>
                    <h1 className={styles.bookingFromTitle}>Contact & Pickup Details</h1>
                    <label htmlFor="nameInput">Name</label>
                    <ContactDetails
                        name="name"
                        placeholder="Enter Your Name"
                        type="text"
                        value={formData.name || ""}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="nameInput"
                    />

                    <label htmlFor="phoneInput">Phone Number</label>
                    <div className={styles.inputContainer}>
                        <ContactDetails
                            style={{ width: "20%" }}
                            id="countryCode"
                            type="tel"
                            name="countryCode"
                            value={formData.countryCode}
                            handleChange={handleChange}
                            placeholder="+91"
                            className={styles.conteryInput}
                            required
                        />
                        <ContactDetails
                            name="phoneNumber"
                            placeholder="Enter Your Phone Number"
                            type="tel"
                            value={formData.phoneNumber || ""}
                            handleChange={handleChange}
                            className={styles.searchInput}
                            id="phoneInput"
                        />
                    </div>
                    <label htmlFor="emailInput">Email</label>
                    <ContactDetails
                        name="email"
                        placeholder="Enter Your Email"
                        type="email"
                        value={formData.email || ""}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="emailInput"
                    />

                    <label htmlFor="PickupInput">Pickup</label>
                    <ContactDetails
                        name="pickupPoint"
                        placeholder="Enter Your Pickup Point"
                        type="text"
                        value={formData.pickupPoint || ""}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="pickupInput"
                    />

                    {title === "round-trip" ? (
                        <>
                            <label htmlFor="destinationInput">Destination</label>
                            <ContactDetails
                                name="dropPoint"
                                placeholder="Enter Your Destination"
                                type="text"
                                value={formData.dropPoint || ""}
                                handleChange={handleChange}
                                className={styles.searchInput}
                                id="destinationInput"
                            />
                        </>
                    ) : title === "multi-city" ? null : (
                        <>
                            <label htmlFor="DropInput">Drop</label>
                            <ContactDetails
                                name="dropPoint"
                                placeholder="Enter Your Drop Point"
                                type="text"
                                value={formData.dropPoint || ""}
                                handleChange={handleChange}
                                className={styles.searchInput}
                                id="DropInput"
                            />
                        </>
                    )}

                    <label htmlFor="OfferInput">Offer Code</label>
                    <ContactDetails
                        name="offerFrom"
                        placeholder="Enter Your Offer Code (Optional)"
                        type="text"
                        value={formData.offerFrom || ""}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="OfferInput"
                    />

                    <div className={styles.paymentOptions}>
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="initial"
                                checked={formData.paymentType === "initial"}
                                onChange={handleChange}
                            />
                            Initial ₹ 500
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="full"
                                checked={formData.paymentType === "full"}
                                onChange={handleChange}
                            />
                            Full ₹ {total}
                        </label>
                    </div>

                    {
                        // !isOtpSent ? (
                        //     <button
                        //         onClick={handleSendOtp}
                        //         disabled={loading}
                        //         className={loading ? styles.bookingLoading : styles.bookingButton}
                        //     >
                        //         {loading ? <span className={styles.vibratingPhone}> Sending ...</span> : "Send OTP"}
                        //     </button>
                        // ) :
                        <>
                            {/* <label htmlFor="otpInput">Enter OTP</label>
                            <OtpVerification
                                numberOfDigits={6}
                                correctOtp={correctOtp}
                                setEnteredOtp={setEnteredOtp}
                                handleSendOtp={handleSendOtp}
                            /> */}
                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className={loading ? styles.bookingLoading : styles.bookingButton}
                            >
                                {loading ? <span className={styles.carLoading}></span> : 'Confirm Booking'}
                            </button>

                        </>
                    }
                </div>

                {/* Booking Details */}
                <div className={styles.bookingDetails}>
                    <div className={styles.bookingDetailsForm}>
                        <h3 className={styles.bookingDetailsTitle}>Your Booking Details</h3>
                        <div className={styles.bookingBoxForm}>
                            <div className={styles.bookingDetailsBox}>
                                <h4 className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Itinerary:</span><span>{from}&gt;{to}</span>
                                </h4>
                                <h4 className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Pickup Date:</span> {startDate} at {time}
                                </h4>
                                <h4 className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Car Type:</span> {selectedCar}
                                </h4>
                                <h4 className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Booking Price:</span> ₹ {amount}
                                </h4>
                                <h4 className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>GST (5%):</span> + ₹ {gstAmount}
                                </h4>
                                {isNightChargeApplicable && (
                                    <h4 className={styles.bookingDetailsText}>
                                        <span className={styles.bookingDetailsLabel}>Night Charges:</span> + ₹{nightCharge}
                                    </h4>
                                )}
                                <h4 className={styles.bookingDetailsTotal}>
                                    <span className={styles.bookingDetailsLabel}>Total Price:</span> ₹{total}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Other Details */}
                    <div className={styles.bookingForm}>
                        <div className={styles.tabButtons}>
                            <button
                                className={`${styles.tabButton} ${activeTab === 'inclusions' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('inclusions')}
                            >
                                Inclusions
                            </button>
                            <button
                                className={`${styles.tabButton} ${activeTab === 'exclusions' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('exclusions')}
                            >
                                Exclusions
                            </button>
                            <button
                                className={`${styles.tabButton} ${activeTab === 't&c' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('t&c')}
                            >
                                T&C
                            </button>
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === 'inclusions' && (
                                <div className={styles.inExboxes}>
                                    <ul className={styles.listGroup}>
                                        <li>Toll / State tax</li>
                                        <li>Base Fare and Fuel Charges</li>
                                        <li>Driver Allowance</li>
                                        <li>GST (5%)</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'exclusions' && (
                                <div className={styles.inExboxes}>
                                    <ul className={styles.listGroup}>
                                        {title === "round-trip" || title === "multi-city" ? <li>Parking</li> : null}
                                        <li>Night Charges (10:00 PM to 6:00 AM)</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 't&c' && (
                                <ul className={styles.listGroup}>
                                    {title === "one-way" ? (
                                        <>
                                            <li>Your trip has <span className={styles.highlight}>{distance}</span> KM limit. If your usage exceeds this limit, you will be charged for the excess Km used.</li>
                                            <li>Your trip includes one pick up in Pick-up city and one drop to destination city. It does not include within city travel.</li>
                                            <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                        </>
                                    ) : title === "round-trip" ? (
                                        <>
                                            <li>Your Trip has <span className={styles.highlight}>{distance}</span> KM limit and in case of certain special packages may even contain Hours limit. If your usage exceeds these limits, you will be charged for the excess KM used (and/or hour if applicable).</li>
                                            <li>The Airport entry charge, if applicable, is not included in the fare and will be charged extra.</li>
                                            <li>All road toll fees, parking charges, state taxes etc. are charged extra and need to be paid to the concerned authorities as per actuals.</li>
                                            <li>For driving between 09:45 PM to 06:00 AM on any of the nights, an additional allowance will be applicable and is to be paid to the driver.</li>
                                            <li>Please ensure you have covered all cities you plan to visit in your itinerary. This will help our driver prepare accordingly. Adding city to the itinerary during trip may not be possible.</li>
                                            <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>Your trip has <span className={styles.highlight}>{distance}</span> KM limit. If your usage exceeds this limit, you will be charged for the excess Km used.</li>
                                            <li>Your trip includes one pick up in Pick-up city and one drop to destination city. It does not include within city travel.</li>
                                            <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                        </>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}