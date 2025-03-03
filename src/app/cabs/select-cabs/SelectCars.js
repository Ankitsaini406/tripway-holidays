"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PiCertificateLight } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import styles from "@/styles/pages/selectCabs.module.css";
import PopUp from "@/utils/popUp";
import { ContactDetails } from "@/utils/Utils";
import { toast } from "react-toastify";

export default function SelectCars() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const title = searchParams.get("title");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const startDate = searchParams.get("startDate");
    const time = searchParams.get("time");

    const [showPopUp, setShowPopUp] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
    });

    const aisensy = process.env.AI_SENSY;

    useEffect(() => {
        if (!title || !from || !to) {
            router.push(`/cabs/${title}`);
        }
    }, [title, from, to, startDate, router]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelect = (car) => {
        setSelectedCar(car);
        setShowPopUp(true);
    };

    const sendMessage = async () => {
        if (!formData.name || !formData.phoneNumber) {
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
            templateParams: [formData.name, from, to, `${startDate} ${time}`, selectedCar.name, "500"],
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
            setShowPopUp(false);
            setFormData({ name: "", phoneNumber: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message. Try again.");
        }
    };

    const oneWay = [
        { name: "Swift", image: "/cab/swift.webp", perKm: '13', minPrice: 500 },
        { name: "Etios", image: "/cab/etios.webp", perKm: '13', minPrice: 500 },
        { name: "Ertiga", image: "/cab/ertica.webp", perKm: '16', minPrice: 500 },
        { name: "Innova", image: "/cab/innova.webp", perKm: '17', minPrice: 500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", perKm: '19', minPrice: 500 },
    ];

    const roundTrip = [
        { name: "Swift", image: "/cab/swift.webp", perKm: '10', minPrice: 500 },
        { name: "Etios", image: "/cab/etios.webp", perKm: '10', minPrice: 500 },
        { name: "Ertiga", image: "/cab/ertica.webp", perKm: '13', minPrice: 500 },
        { name: "Innova", image: "/cab/innova.webp", perKm: '14', minPrice: 500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", perKm: '16', minPrice: 500 },
        { name: "Force", image: "/cab/fource.webp", perKm: '22', minPrice: 500 },
    ];

    const multiCity = [
        { name: "Swift", image: "/cab/swift.webp", perKm: '10 ', minPrice: 500 },
        { name: "Etios", image: "/cab/etios.webp", perKm: '10', minPrice: 500 },
        { name: "Ertiga", image: "/cab/ertica.webp", perKm: '13 ', minPrice: 500 },
        { name: "Innova", image: "/cab/innova.webp", perKm: '14 ', minPrice: 500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", perKm: '16', minPrice: 500 },
        { name: "Force", image: "/cab/fource.webp", perKm: '22', minPrice: 500 },
    ];

    const cars = title === 'one-way' ? oneWay : 'round-trip' ? roundTrip : multiCity;

    return (
        <div className="layout">
            {showPopUp && (
                <PopUp
                    popTime={0}
                    closeTime={0}
                    src={null}
                    alt=""
                    name={
                        <div>
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
                        </div>
                    }
                    phoneNumber={
                        <div>
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
                        </div>
                    }
                    onClick={sendMessage}
                />
            )}

            {cars.map((car, index) => (
                <div key={index} className={styles.carMainBox}>
                    <div className={styles.carFlex}>
                        <div className={styles.carBox}>
                            <div className={styles.carImg}>
                                <Image
                                    className={styles.heroImage}
                                    src={car.image}
                                    alt={car.name}
                                    width={100}
                                    height={50}
                                />
                            </div>
                            {car.name}
                        </div>
                        <div className={styles.carDetailsBox}>
                            <div className={styles.itemBox}>
                                <PiCertificateLight />
                                <h5>Certified Driver & Cab</h5>
                            </div>
                            <div className={styles.itemBox}>
                                <IoNewspaperOutline />
                                <h5>Toll Exclusions</h5>
                            </div>
                            <div className={styles.itemBox} style={{ gap: "0" }}>
                                <h4>₹ {car.perKm}</h4>
                                <h6>{car.name === 'Force' ? 'min /' : 'per'} Km</h6>
                            </div>
                            <div className={styles.itemBox} style={{ gap: "0" }}>
                                <h3>₹ 500</h3>
                                <h5>Booking Price</h5>
                            </div>
                        </div>
                        <button className={styles.selectBtn} onClick={() => handleSelect(car)}>
                            Select
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
