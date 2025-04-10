"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PiCertificateLight } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import styles from "@/styles/pages/selectCabs.module.css";
import { toast } from "react-toastify";
import Breadcrumbs from "@/utils/Breadcrumbs";
import { getDistance, getTotalDistance } from "@/app/action/getDistance";
import Loading from "@/app/loading";

export default function SelectCars({ bookingData }) {
    const router = useRouter();

    const title = bookingData.title;
    const from = bookingData.from;
    const to = bookingData.to;
    const startDate = bookingData.startDate;
    const time = bookingData.time;

    const [distance, setDistance] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);

    // Fetch distance on the client side
    useEffect(() => {
        if (!title || !from || !to) {
            router.back();
            return;
        }

        const fetchDistance = async () => {
            let computedDistance;
            if (title === "multi-city") {
                computedDistance = await getTotalDistance([from, ...to]); // Spread `to` as it's an array
            } else {
                computedDistance = await getDistance(from, to);
            }
            setDistance(computedDistance);
        };

        fetchDistance();
    }, [title, from, to, router]);

    if (distance === null) {
        return <Loading />
    }

    const handleSearch = async (car, bookingPrice, totalDistance) => {
        setSelectedCar(car);
        if (!car) {
            toast.error("Please select the car.");
            return;
        }

        const formattedTotalDistance = totalDistance.toFixed(2);

        const response = await fetch("/api/secure", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                from: from,
                to: to,
                startDate: startDate,
                time: time,
                selectedCar: car.name,
                amount: bookingPrice,
                distance: formattedTotalDistance,
            }),
        });

        const data = await response.json();
        if (data.token) {
            router.push(`/cabs/select-cabs/booking-from`);
        }
    };

    const oneWay = [
        { name: "Swift", image: "/cab/swift.webp", perKm: 13, minPrice: 500 },
        { name: "Etios", image: "/cab/etios.webp", perKm: 13, minPrice: 500 },
        { name: "Ertiga", image: "/cab/ertica.webp", perKm: 16, minPrice: 500 },
        { name: "Innova", image: "/cab/innova.webp", perKm: 17, minPrice: 500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", perKm: 19, minPrice: 500 },
    ];

    const roundTrip = [
        { name: "Swift", image: "/cab/swift.webp", perKm: 10, minPrice: 500 },
        { name: "Etios", image: "/cab/etios.webp", perKm: 10, minPrice: 500 },
        { name: "Ertiga", image: "/cab/ertica.webp", perKm: 13, minPrice: 500 },
        { name: "Innova", image: "/cab/innova.webp", perKm: 14, minPrice: 500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", perKm: 16, minPrice: 500 },
        { name: "Force", image: "/cab/fource.webp", perKm: 22, minPrice: 500 },
    ];

    const multiCity = [
        { name: "Swift", image: "/cab/swift.webp", perKm: 10, minPrice: 500 },
        { name: "Etios", image: "/cab/etios.webp", perKm: 10, minPrice: 500 },
        { name: "Ertiga", image: "/cab/ertica.webp", perKm: 13, minPrice: 500 },
        { name: "Innova", image: "/cab/innova.webp", perKm: 14, minPrice: 500 },
        { name: "Innova Crysta", image: "/cab/innova.webp", perKm: 16, minPrice: 500 },
        { name: "Force", image: "/cab/fource.webp", perKm: 22, minPrice: 500 },
    ];

    const cars = title === "one-way" ? oneWay : title === "round-trip" ? roundTrip : multiCity;

    return (
        <div className="layout">
            <Breadcrumbs title={title} />
            {cars.map((car, index) => {
                const totalDistance =
                    title === "round-trip"
                        ? Number(distance) * 2 + 30
                        : title === "multi-city"
                        ? Number(distance) + 40
                        : Number(distance) + 20;

                const bookingPrice = Math.round(car.perKm * totalDistance);

                return (
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
                                    <h5>Toll Inclusions</h5>
                                </div>
                                <div className={styles.itemBox} style={{ gap: "0" }}>
                                    <h4>₹ {car.perKm}</h4>
                                    <h6>{car.name === "Force" ? "min /" : "per"} Km</h6>
                                </div>
                                <div className={styles.itemBox} style={{ gap: "0", whiteSpace: "nowrap" }}>
                                    <h3>₹ {bookingPrice}</h3>
                                    <h5>Booking Price</h5>
                                </div>
                            </div>
                            <button className={styles.selectBtn} onClick={() => handleSearch(car, bookingPrice, totalDistance)}>
                                Select
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
