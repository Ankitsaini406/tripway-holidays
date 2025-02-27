"use client";

import React from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useClient } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { SlDirections } from "react-icons/sl";
import useCabSearchForm from "@/hook/useCabSerachForm";
import { PiTrainLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import styles from "@/styles/pages/cabs.module.css";
import Testimonials from "@/components/testimonials";
import { MdModeOfTravel, MdPayment, MdTravelExplore, MdMoneyOff } from "react-icons/md";
import FaqDropdown from "@/components/FaqDropdown";
import WhyChooseUs from "@/components/WhyChooseUs";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export default function RoundTripComponent() {

    const { user, signupUserWithEmailAndPassword } = useClient();
    const { formData, fromOptions, setFormData, handleChange } = useCabSearchForm(user, signupUserWithEmailAndPassword);
        const router = useRouter();
    
        const handleSearch = () => {
            if (!formData.from || !formData.to || !formData.startDate || !formData.time) {
                toast.error("Please fill in all fields before proceeding.");
                return;
            }
    
            router.push(`/cabs/select-cabs?title=round-trip&from=${formData.from}&to=${formData.to}&startDate=${formData.startDate.toISOString()}&time=${formData.time}`);
        };

    const whyChooseUs = [
        {
            title: 'Tailored Experiences',
            description: ' Every trip is customized to match your style and interests.',
            icons: <PiTrainLight />,
        },
        {
            title: 'Expert Planning',
            description: 'Our team knows the ins and outs of travel, so you don’t have to worry about a thing.',
            icons: <IoPricetagOutline />,
        },
        {
            title: 'Affordable Luxury',
            description: 'Get premium experiences without breaking the bank.',
            icons: <BiSolidOffer />,
        },
        {
            title: '24/7 Support',
            description: 'We’re just a call or click away, wherever you are in the world.',
            icons: <BiSupport />,
        },
        {
            title: 'Sustainable Travel',
            description: 'We care about the planet and support eco-friendly tourism.',
            icons: <MdTravelExplore />,
        },
        {
            title: 'No-Fee Flexibility',
            description: 'We get it. Cancel or adjust your round trip up to 48 hours before you roll out, no charge, no hassle.',
            icons: <MdPayment />,
        },
        {
            title: 'Hassle-Free Travel',
            description: 'We take care of everything, from planning the route to ensuring a smooth journey. Just sit back and relax!',
            icons: <MdModeOfTravel />,
        },
        {
            title: 'No Hidden Fees or Penalties',
            description: ' We believe in transparency, so you won’t be charged unnecessary fees for canceling within the allowed timeframe.',
            icons: <MdMoneyOff />,
        },
    ]

    const faqData = [
        { question: '1. What is included in a TripyaHoliday round-trip car tour?', answer: 'Our round-trip car tours typically include a well-maintained vehicle, a detailed itinerary with suggested stops, fuel recommendations, and 24/7 roadside assistance. Optional add-ons like guided tours, meals, or hotel bookings can be customized based on your preferences.' },
        { question: '2. How do I book a round-trip car tour with TripyaHoliday?', answer: 'It’s simple! Visit our website, pick your destination (like Jaipur!), select your travel dates, and choose a package that suits you. You can also call us at +91 8890906400 or email tripwayholiday@gmail.com for a personalized plan.' },
        { question: '3. Can I customize my round-trip itinerary?', answer: 'Absolutely! Whether you want to add a detour, spend extra time at a spot, or adjust the return schedule, we’ll tailor the trip to fit your needs. Just let us know when you book or contact our team.' },
        { question: '4. What type of cars do you provide for round trips?', answer: 'We offer a range of vehicles – from compact cars for solo travelers or couples to SUVs and minivans for families or groups. All cars are clean, reliable, and equipped for a comfortable journey.' },
        { question: '5. How long does a round-trip car tour usually take?', answer: 'It depends on the destination and your pace. For example, a round trip to Jaipur from Delhi might take 2-3 days, including driving and sightseeing. We’ll suggest a timeline, but you can adjust it to suit your schedule.' },
        { question: '6. What happens if I need to cancel or change my round-trip plans?', answer: 'We’re flexible! Cancel or reschedule up to 48 hours before departure at no extra cost – no cancellation fee applies. If it’s within 48 hours, a small fee may apply depending on the package. Contact us as soon as possible, and we’ll take care of it.' },
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
                                {/* <input
                                type="text"
                                name="from"
                                placeholder="From"
                                value={formData.from}
                                onChange={handleChange}
                                className={styles.searchInput}
                                required
                                /> */}
                                <div className={styles.distanceIcon}>
                                    <SlDirections />
                                </div>
                                <input
                                    type="text"
                                    name="destination"
                                    placeholder="Distination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    className={styles.searchInput}
                                    required
                                />
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
                            className={`${formData.loading ? 'loadingButton' : styles.searchButton}`}
                        >
                            EXPLORE CABS
                        </button>
                    </div>

                    <WhyChooseUs title='Why Choose Round Trip Cab?'
                        description="Are you tired of the hassle of booking separate cabs for your Round Trip journeys? With Round Trip Cab, enjoy a seamless travel experience with a single booking. India's leading intercity cab service provider ensures affordable round-trip fares, so you can travel conveniently without overpaying. Get a reliable, comfortable, and cost-effective ride for your entire journey—because every mile matters! 🚖"
                        whyChooseUs={whyChooseUs}
                    />

                    <FaqDropdown faqData={faqData} />

                    <Testimonials category='round-trip' />
                </div>
            </div>
        </>
    )
}