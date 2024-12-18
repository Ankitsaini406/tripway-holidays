export async function generateMetadata() {
    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        const response = await fetch(`${apiPoint}api/group-tours`);
        if (!response.ok) {
            throw new Error("Failed to fetch tour data");
        }

        const tours = await response.json();

        if (tours && tours.length > 0) {
            const primaryTour = tours[0];  // Use the first tour package for metadata

            return {
                title: `Group Tours`,
                description: `Join our exclusive group tour. Discover amazing experiences, adventure, and memories.`,
                keywords: [
                    "Group Tour",
                    "Tripway Holidays",
                    "Adventure Tour",
                    "Travel Packages",
                    "Book Group Tour",
                    primaryTour.name,
                ],
                openGraph: {
                    title: `Group Tour: ${primaryTour.name}`,
                    description: `Explore our group tours. Book now and create unforgettable experiences.`,
                    url: `https://tripwayholidays.in/group-tour/${primaryTour.id}`,
                    type: "website",
                    images: [
                        {
                            url: primaryTour.imageUrl,  // Dynamically get the tour image
                            width: 1200,
                            height: 630,
                            alt: `Tripway Holidays ${primaryTour.name} Tour`,
                        },
                    ],
                },
            };
        }

        return {
            title: "Group Tours | Tripway Holidays",
            description: "Explore our group tours and discover memorable experiences with Tripway Holidays.",
            openGraph: {
                title: "Group Tours - Tripway Holidays",
                description: "Join our adventure-packed group tours and explore new destinations.",
                url: "https://tripwayholidays.in/group-tour",
            }
        };

    } catch (error) {
        console.error("Failed to generate metadata", error);
        return {
            title: "Group Tours Not Found",
            description: "No group tours are currently available. Stay tuned for upcoming experiences.",
            openGraph: {
                title: "Group Tours",
                description: "Discover amazing tours with Tripway Holidays.",
            }
        };
    }
}

import TourPackages from "./touPackages";

export default function Page() {
    return <TourPackages />;
}
