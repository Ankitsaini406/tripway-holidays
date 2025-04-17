import { structuredData } from "@/utils/structuredDate";
import OneWayComponent from "./OneWayComponent";
import Script from "next/script";

const fromOptions = [
    { value: "", label: "From" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Chidawa", label: "Chidawa" },
    { value: "Pilani", label: "Pilani" },
    { value: "Khetri", label: "Khetri" },
    { value: "Mandawa", label: "Mandawa" },
    { value: "Churu", label: "Churu" },
    { value: "Sujangarh", label: "Sujangarh" },
    { value: "Ratangarh", label: "Ratangarh" },
    { value: "Salasar", label: "Salasar" },
    { value: "Ladnun", label: "Ladnun" },
    { value: "Bidasar", label: "Bidasar" },
    { value: "Sikar", label: "Sikar" },
    { value: "Reengas", label: "Reengas" },
    { value: "Khatushyam Ji", label: "Khatushyam Ji" },
    { value: "Fatehpur", label: "Fatehpur" },
    { value: "Laxmanagarh", label: "Laxmanagarh" },
    { value: "Dhod", label: "Dhod" },
    { value: "Nechwa", label: "Nechwa" },
    { value: "Khood", label: "Khood" },
    { value: "Losal", label: "Losal" },
    { value: "Neem ka Thana", label: "Neem ka Thana" },
    { value: "Jhunjhunu", label: "Jhunjhunu" },
    { value: "Nawalgarh", label: "Nawalgarh" },
];

const baseKeywords = [
    "One way cab booking",
    "One way taxi service",
    "Book one way cab",
    "one way taxi service",
    "one way car rental",
    "drop taxi one way",
    "one way trip",
    "one way trip cab",
    "one way trip car rental",
    "sikar taxi contact number",
];

// Extract city-specific keywords
const cityKeywords = fromOptions
    .filter(option => option.value)
    .flatMap(option => [
        `${option.label} taxi service`,
        `cab from ${option.label}`,
        `${option.label} one way cab`,
        `${option.label} car rental`,
        `book taxi from ${option.label}`,
        `${option.label} to ${option.label} distance`
    ]);


export const metadata = {
    title: "One Way Trip Cab Services",
    description: "Book your one way trip with trusted cab services at the best rates. Safe, reliable, and comfortable rides for one way travel. Instant booking available!",
    keywords: [...baseKeywords, ...cityKeywords],
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