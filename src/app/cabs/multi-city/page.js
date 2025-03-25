import Script from "next/script";
import MultiCityComponent from "./MultiCityComponent";
import { structuredData } from "@/utils/structuredDate";

export const metadata = {
    title: "Multi-City Cabs",
    description: "Book a multi-city cab for your long-distance journey. Enjoy the best rates, reliable taxis, and hassle-free online booking for intercity travel with TripWayHolidays.",
    keywords: [
        "Multi-city cab booking",
        "Multi-city taxi service",
        "Book multi-city cab",
        "Multi-city cab hire",
        "Multi-city car rental",
        "Flexible multi-city taxi rides",
        "Affordable multi-city travel",
        "Best multi-city cab deals",
        "Long-distance city travel",
        "Reliable intercity taxi service",
        "Online cab booking for multiple cities",
        "Safe & hassle-free multi-city trips"
    ],
    openGraph: {
        title: "Multi-City Cab Booking | Flexible City-to-City Taxi Service - TripWayHolidays",
        description: "Plan your trip across multiple cities with ease! TripWayHolidays provides affordable and reliable multi-city cab services for your long-distance journey.",
        url: "https://tripwayholidays.in/cabs/multi-city",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.multiCity) }}
            />
            <MultiCityComponent />
        </>
    );
}
