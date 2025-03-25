import { structuredData } from "@/utils/structuredDate";
import OneWayComponent from "./OneWayComponent";
import Script from "next/script";

export const metadata = {
    title: "One Way Cabs",
    description: "One-way cab services made easy! TripWayHolidays offers affordable fares, clean cars, and timely pickups. Book online now for a hassle-free trip.",
    keywords: [
        "One way cab booking",
        "One way taxi service",
        "Book one way cab",
        "One way cab hire",
        "One way car rental",
        "One way drop taxi",
        "Affordable one way taxi"
    ],
    openGraph: {
        title: "One Way Cabs at Best Prices | TripWayHolidays - Safe & Reliable",
        description: "Book an affordable one-way cab for a hassle-free city-to-city ride! Enjoy the best cab booking service with reliable outstation one-way taxi rentals. Hire a one-way drop taxi online now!",
        url: "https://tripwayholidays.in/cabs/one-way",
        type: "website",
    },
};

export default function Page() {
    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.oneWay) }}
            />
            <OneWayComponent />
        </>
    )
}