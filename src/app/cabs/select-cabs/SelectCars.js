"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PiCertificateLight } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import styles from "@/styles/pages/selectCabs.module.css";
import { toast } from "react-toastify";
import Breadcrumbs from "@/utils/Breadcrumbs";

export default function SelectCars() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const title = searchParams.get("title");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const startDate = searchParams.get("startDate");
    const time = searchParams.get("time");

    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        if (!title || !from || !to) {
            router.back();
        }
    }, [title, from, to, startDate, router]);

    const handleSearch = (car) => {
        setSelectedCar(car);
            if (!car) {
                toast.error("Please select the car.");
                return;
            }

            const url = `/cabs/select-cabs/booking-from?title=one-way&from=${from}&to=${to}&startDate=${startDate}&time=${time}&selectedCar=${encodeURIComponent(car.name)}`;
            router.push(url);
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
            <Breadcrumbs title={title} />
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
                        <button className={styles.selectBtn} onClick={() => handleSearch(car)}>
                            Select
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
