export async function generateMetadata({ params }) {
    const id = params.id;

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        // Fetch the tour data for a specific tour ID
        const response = await fetch(`${apiPoint}api/group-tours/${id}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch tour data");
        }

        const tour = await response.json();

        if (tour) {
            const { name, description, startDate, imageUrl } = tour;

            return {
                title: `${name}`,
                description: `Join our exclusive group tour to experience ${description}. A perfect adventure for travel lovers.`,
                keywords: [
                    "Group Tour",
                    "Tripway Holidays",
                    "Adventure Tour",
                    "Travel Packages",
                    "Book Group Tour",
                    name,
                    startDate,
                ],
                openGraph: {
                    title: `Group Tour: ${name}`,
                    description: `Explore our ${name} tour. Book now and enjoy unforgettable experiences.`,
                    url: `https://tripwayholidays.in/group-tour/${id}`,
                    type: "website",
                    images: [
                        {
                            url: imageUrl,  // Dynamically sourced tour image
                            width: 1200,
                            height: 630,
                            alt: `Tripway Holidays ${name} Tour`,
                        },
                    ],
                },
            };
        }

        return {
            title: "Group Tours | Tripway Holidays",
            description: "Explore our group tours and create unforgettable travel experiences.",
            openGraph: {
                title: "Group Tours - Tripway Holidays",
                description: "Join our group tours and visit exciting destinations.",
                url: "https://tripwayholidays.in/group-tour",
            }
        };

    } catch (error) {
        console.error("Metadata generation error:", error);

        return {
            title: "Group Tour Not Found",
            description: "No group tour information is currently available.",
            openGraph: {
                title: "Group Tours - Tripway Holidays",
                description: "Discover group tours with Tripway Holidays.",
            }
        };
    }
}

import TourDetails from "./tourDetails";

export default function Page() {
    return <TourDetails />;
}
