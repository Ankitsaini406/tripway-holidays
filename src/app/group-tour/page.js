import Script from "next/script";
import TourPackages from "./touPackages";
import { generateToursStructuredData } from "@/utils/structuredDate";

async function fetchTourData() {
    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    try {
        const response = await fetch(`${apiPoint}/api/group-tours`);
        if (!response.ok) {
            console.error(`API responded with status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch tour data:", error);
        return null;
    }
}


export async function generateMetadata() {
    const tours = await fetchTourData();

    if (tours && tours.length > 0) {
        const primaryTour = tours[0]; // Use the first tour for metadata

        return {
            title: `Group Tours - ${primaryTour.name}`,
            description: `Join our exclusive group tour: ${primaryTour.name}. Discover amazing experiences, adventure, and memories.`,
            keywords: [
                "Group Tour",
                "Tripway Holidays",
                "Adventure Tour",
                "Travel Packages",
                "Book Group Tour",
                "group tour packages",
                primaryTour.name,
            ],
            openGraph: {
                title: `Group Tour: ${primaryTour.name}`,
                description: primaryTour.description,
                url: `https://tripwayholidays.in/group-tour/${primaryTour.slug}`,
                type: "website",
                images: [
                    {
                        url: `https://tripwayholidays.in/tour-images/${primaryTour.imageUrl}`,
                        width: 400,
                        height: 400,
                        alt: `Tripway Holidays ${primaryTour.name} Tour`,
                    },
                ],
            },
        };
    }

    // Fallback metadata if no tours are available
    return {
        title: "Group Tours | Tripway Holidays",
        description: "Explore our group tours and discover memorable experiences with Tripway Holidays.",
        openGraph: {
            title: "Group Tours - Tripway Holidays",
            description: "Join our adventure-packed group tours and explore new destinations.",
            url: "https://tripwayholidays.in/group-tour",
        },
    };
}

export default async function Page() {
    // const imageUrl = process.env.IMAGE_URL;
    const tourData = await fetchTourData();

    if (!tourData || tourData.length === 0) {
        console.error("No tour data found.");
        return <div>No tours available.</div>;
    }

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToursStructuredData(tourData)) }}
            />
            <TourPackages tourData={tourData}/>
        </>
    );
}

