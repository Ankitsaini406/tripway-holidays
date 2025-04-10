"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useClient } from "@/context/UserContext";
import { useRouter } from "next/navigation";
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
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { formatTime, formatTimestamp } from "@/utils/formatData";

export default function MultiCityComponent() {

    const { user } = useClient();
    const { formData, fromOptions, inputValue, tags, setFormData, handleChange, handleInputChange, removeTag, handleKeyDown } = useCabSearchForm(user);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.from || !tags || !formData.startDate || !formData.time) {
            toast.error("Please fill in all fields before proceeding.");
            setLoading(false);
            return;
        }

        if (tags.length < 2) {
            toast.error("Please select at least two destinations.");
            return;
        }

        const date = formatTimestamp(formData.startDate);
        const time = formatTime(formData.time);

        const response = await fetch("/api/secure", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: 'multi-city', from: formData.from, to: tags, startDate: date, time: time
            })
        });

        const data = await response.json();
        if (data.token) {
            router.push(`/cabs/select-cabs`);
        }

        // router.push(`/cabs/select-cabs?title=multi-city&from=${formData.from}&to=${encodeURIComponent(tags)}&startDate=${date}&time=${time}`);
    };

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
        { question: '1. What is a multi-city trip?', answer: 'A multi-city car trip allows you to travel to multiple destinations in one journey, either with a single rental car or your own vehicle. It’s perfect for road trips, exploring different cities, and experiencing new places at your own pace.' },
        { question: '2. How do I book a multi-city trip?', answer: 'You can book a multi-city trip through our website by selecting the "Multi-City" option in the flight or trip search tool. Enter your desired destinations, travel dates, and other preferences, then proceed with booking.' },
        { question: '3. What are the payment options available?', answer: 'We accept multiple payment options, including cash, credit/debit cards, Paytm, and UPI payments. You can pay at the time of booking or after completing your ride.' },
        { question: '4. Is there any cancellation charge for Multi City bookings?', answer: 'No, cancellations within 48 hours are free of charge. If you cancel after this period, minimal charges may apply.' },
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
                <h1 className={styles.heroText}>&quot;Multi-City – Smart Planning, Seamless Travel, Maximum Value, Multiple Cities.&quot;</h1>
            </div>
            <div className="layout">
                <div>
                    <div className={styles.mainflex}>
                        <div className={styles.flexRedio}>
                            <div className={styles.radioOption}>
                                <div className={styles.boxInfo}>
                                    <h5 className={styles.boxNote}>Note: 25km near by these location</h5>
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
                                </div>
                                {/* <input
                                    type="text"
                                    name="from"
                                    placeholder="From"
                                    value={formData.from}
                                    onChange={handleChange}
                                    className={styles.searchInput}
                                    required
                                /> */}
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
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className={styles.searchButton}
                        >
                            {loading ? <span className='loadingDots'>Waiting Cabs </span> : "EXPLORE CABS"}
                        </button>
                    </div>

                    <WhyChooseUs title='Why Choose Multi City Cab?'
                        description="​Experience the freedom to explore multiple destinations with our customizable multi-city cab services. Plan your journey across various cities, and we'll ensure a comfortable and seamless ride tailored to your itinerary."
                        whyChooseUs={whyChooseUs}
                    />

                    <FaqDropdown faqData={faqData} />

                    <Testimonials category='multi-city' />
                </div>
            </div>
        </>
    )
}