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
    }, [from, to, startDate, router]);


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

        const campaign = title === "one-way" ? 'websiteonewaybooking' : 'round-trip' ? 'websiteroundtripbooking' : 'websitemulticitybooking';

        try {
            const res = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
                method: "POST",
                body: JSON.stringify({
                    apiKey: aisensy,
                    campaignName: campaign,
                    destination: `+91${formData.phoneNumber}`,
                    1: formData.name,
                    2: from,
                    3: to,
                    4: startDate,
                    5: selectedCar.name,
                    6: selectedCar.price,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to send message.");
            }

            const data = await res.json();
            console.log("WhatsApp Response:", data);

            if (data.success) {
                alert("Message sent successfully!");
                setShowPopUp(false);
                setFormData({ name: "", phoneNumber: "" }); // Reset form
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const oneWay = [
        { name: "Swift", image: "/cab/swift.webp", price: 1800 },
        { name: "Etios", image: "/cab/etios.webp", price: 1800 },
        { name: "Ertiga", image: "/cab/ertica.webp", price: 1800 },
        { name: "Innova", image: "/cab/innova.webp", price: 2500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", price: 2800 },
    ];

    const roundTrip = [
        { name: "Swift", image: "/cab/swift.webp", price: '10 per Km' },
        { name: "Etios", image: "/cab/etios.webp", price: '10 per Km' },
        { name: "Ertiga", image: "/cab/ertica.webp", price: '13 per Km' },
        { name: "Innova", image: "/cab/innova.webp", price: '14 per Km' },
        { name: "Innova Crysta", image: "/cab/innova.webp", price: '15 per Km' },
        { name: "Fource", image: "/cab/fource.webp", price: '22 per Km' },
    ];

    const multiCity = [
        { name: "Swift", image: "/cab/swift.webp", price: 1800 },
        { name: "Etios", image: "/cab/etios.webp", price: 1800 },
        { name: "Ertiga", image: "/cab/ertica.webp", price: 1800 },
        { name: "Innova", image: "/cab/innova.webp", price: 2500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", price: 2800 },
        { name: "Fource", image: "/cab/fource.webp", price: 2800 },
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
                        <ContactDetails
                            name="name"
                            placeholder="Enter Your Name"
                            type="text"
                            value={formData.name}
                            handleChange={handleChange}
                            className={styles.searchInput}
                        />
                    }
                    phoneNumber={
                        <ContactDetails
                            name="phoneNumber"
                            placeholder="Enter Your Phone Number"
                            type="number"
                            value={formData.phoneNumber}
                            handleChange={handleChange}
                            className={styles.searchInput}
                        />
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
                                {car.name}
                            </div>
                        </div>
                        <div className={styles.carDetailsBox}>
                            <div className={styles.itemBox}>
                                <PiCertificateLight />
                                <h5>Pri</h5>
                            </div>
                            <div className={styles.itemBox}>
                                <IoNewspaperOutline />
                                <h5>Toll Exclusions</h5>
                            </div>
                            {/* <div className={styles.itemBox} style={{ gap: "0" }}>
                                <h4>₹ {car.price + 100}</h4>
                                <h6>Save ₹ 100</h6>
                            </div> */}
                            <div className={styles.itemBox} style={{ gap: "0" }}>
                                <h3>₹ {car.price}</h3>
                                {/* <h5>Up to 130 Km</h5> */}
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
