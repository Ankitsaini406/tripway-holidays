import Script from "next/script";
import RoundTripComponent from "./RoundTripComponent";
import { structuredData } from "@/utils/structuredDate";

export const metadata = {
    title: "Round Trip Cabs",
    description: "Book an affordable round trip cab with TripWayHolidays for a hassle-free journey. Enjoy safe, reliable, and best-priced taxi services for outstation round trips.",
    keywords: [
        "Round trip cab booking",
        "Round trip taxi service",
        "Book round trip cab",
        "Round trip cab hire",
        "Round trip car rental",
        "Outstation round trip taxi",
        "Affordable round trip cab",
        "Best round trip cab fares",
        "Reliable round trip taxi service",
        "Online round trip cab booking",
        "Safe & comfortable taxi rental",
        "Round trip cabs for outstation travel"
    ],
    openGraph: {
        title: "Round Trip Cabs | Best Round Trip Taxi Service - TripWayHolidays",
        description: "Looking for a round trip taxi? TripWayHolidays offers reliable and affordable round trip cab services with professional drivers. Book your journey today!",
        url: "https://tripwayholidays.in/cabs/round-trip",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.roundTrip) }}
            />
            <RoundTripComponent />
        </>
    )
}