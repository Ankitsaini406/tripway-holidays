"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ContactDetails } from "@/utils/Utils";
import styles from "@/styles/pages/selectCabs.module.css";
import Breadcrumbs from "@/utils/Breadcrumbs";
import { toast } from "react-toastify";

export default function BookingFrom() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const title = searchParams.get("title");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const startDate = searchParams.get("startDate");
    const time = searchParams.get("time");
    const selectedCar = searchParams.get("selectedCar");
    const [activeTab, setActiveTab] = useState('inclusions');
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        pickupPoint: "",
        dropPoint: "",
        offerCode: "",
    });

    const aisensy = process.env.AI_SENSY;

    useEffect(() => {
        if (!title || !from || !to) {
            router.back();
        }
    }, [title, from, to, startDate, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const sendMessage = async () => {
        if (!formData.name || !formData.phoneNumber || !formData.email || !formData.pickupPoint || !formData.dropPoint) {
            toast.error("Please fill in all details before proceeding.");
            return;
        }

        const campaign = title === "one-way"
            ? "websiteonewaybooking"
            : title === "round-trip"
                ? "websiteroundtripbooking"
                : "websitemulticitybooking";

        const url = title === "one-way"
            ? "https://www.theglobeandmail.com/resizer/v2/BYBSVGDHZZAFZP7LTGXMHPXZ3Q?auth=ccda29f1d41119ef2fc927c805845397675c96ae83717fa4801a3fdc09f016f1&width=300&height=200&quality=80&smart=true"
            : title === "round-trip"
                ? "https://tripwayholidays.in/cab/round-trip-whatsapp.png"
                : "https://www.aisensy.com/multi-city-booking";

        const fileName = title === "one-way"
            ? "PNG"
            : title === "round-trip"
                ? "PNG"
                : "multi-city.png";

        const requestBody = {
            apiKey: aisensy,
            campaignName: campaign,
            destination: "+91" + formData.phoneNumber,
            userName: formData.name,
            templateParams: [formData.name, from, to, `${startDate} ${time}`, selectedCar, "500"],
            media: {
                url: url,
                filename: fileName
            }
        };

        try {
            const res = await fetch("/api/book-cab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Failed to send message:", data);
                throw new Error(data.error || "Failed to send message");
            }

            console.log("WhatsApp Response:", data);
            toast.success("Message sent successfully!");
            setFormData({ name: "", phoneNumber: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message. Try again.");
        }
    };

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
                        value={formData.name}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="nameInput"
                    />

                    <label htmlFor="phoneInput">Phone Number</label>
                    <ContactDetails
                        name="phoneNumber"
                        placeholder="Enter Your Phone Number"
                        type="number"
                        value={formData.phoneNumber}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="phoneInput"
                    />

                    <label htmlFor="emailInput">Email</label>
                    <ContactDetails
                        name="email"
                        placeholder="Enter Your Email"
                        type="email"
                        value={formData.email}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="emailInput"
                    />

                    <label htmlFor="PickupInput">Pickup</label>
                    <ContactDetails
                        name="pickupPoint"
                        placeholder="Enter Your Pickup Point"
                        type="text"
                        value={formData.pickupPoint}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="pickupInput"
                    />

                    {title === "round-trip" ?
                        <>
                            <label htmlFor="destinationInput">Destination</label>
                            <ContactDetails
                                name="destination"
                                placeholder="Enter Your Destination"
                                type="text"
                                value={formData.dropPoint}
                                handleChange={handleChange}
                                className={styles.searchInput}
                                id="destinationInput"
                            />
                        </>
                        : title === "multi-city" ? null :
                            <>
                                <label htmlFor="DropInput">Drop</label>
                                <ContactDetails
                                    name="dropPoint"
                                    placeholder="Enter Your Drop Point"
                                    type="text"
                                    value={formData.dropPoint}
                                    handleChange={handleChange}
                                    className={styles.searchInput}
                                    id="DropInput"
                                />
                            </>
                    }

                    <label htmlFor="OfferInput">Offer Code</label>
                    <ContactDetails
                        name="offerCode"
                        placeholder="Enter Your Offer Code (Optional)"
                        type="text"
                        value={formData.offerCode}
                        handleChange={handleChange}
                        className={styles.searchInput}
                        id="OfferInput"
                    />

                    <button onClick={sendMessage} className={`${styles.bookingButton} ${styles.pulse}`}>
                        Ganreate Booking
                    </button>
                </div>

                {/* Booking Details */}
                <div className={styles.bookingDetails}>
                    <div className={styles.bookingDetailsForm}>
                        <h3 className={styles.bookingDetailsTitle}>Your Booking Details</h3>
                        <div className={styles.bookingBoxForm}>
                            <div className={styles.bookingDetailsBox}>
                                <p className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Itinerary:</span><span>{from}&gt;{to}</span>
                                </p>
                                <p className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Pickup Date:</span> {startDate} at {time}
                                </p>
                                <p className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Car Type:</span> {selectedCar}
                                </p>
                                <p className={styles.bookingDetailsText}>
                                    <span className={styles.bookingDetailsLabel}>Booking Price:</span> ₹ 500
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Other Details */}
                    <div className={styles.bookingForm}>
                        <>
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
                                            <li>Base Fare and Fuel Charges</li>
                                            <li>Diver Allowance</li>
                                            <li>GST (5%)</li>
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'exclusions' && (
                                    <div className={styles.inExboxes}>
                                        <ul className={styles.listGroup}>
                                            <li>Toll / State tax</li>
                                            <li>Parking</li>
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 't&c' && (
                                    <ul className={styles.listGroup}>
                                        {title === "one-way"
                                            ? (<>
                                                <li>Your trip has a KM limit. If your usage exceeds this limit, you will be charged for the excess Km used.</li>
                                                <li>Your trip includes one pick up in Pick-up city and one drop to destination city. It does not include within city travel.</li>
                                                <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                            </>)
                                            : title === "round-trip" ? (<>
                                                <li>Your Trip has a KM limit and in case of certain special packages may even contain Hours limit. If your usage exceeds these limits, you will be charged for the excess KM used (and/or hour if applicable).</li>
                                                <li>The Airport entry charge, if applicable, is not included in the fare and will be charged extra.</li>
                                                <li>All road toll fees, parking charges, state taxes etc. are charged extra and need to be paid to the concerned authorities as per actuals.</li>
                                                <li>For driving between 09:45 PM to 06:00 AM on any of the nights, an additional allowance will be applicable and is to be paid to the driver.</li>
                                                <li>Please ensure you have covered all cities you plan to visit in your itinerary. This will help our driver prepare accordingly. Adding city to the itinerary during trip may not be possible.</li>
                                                <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                            </>) : (<>
                                                <li>Your trip has a KM limit. If your usage exceeds this limit, you will be charged for the excess Km used.</li>
                                                <li>Your trip includes one pick up in Pick-up city and one drop to destination city. It does not include within city travel.</li>
                                                <li>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                            </>)
                                        }
                                    </ul>
                                )}
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}