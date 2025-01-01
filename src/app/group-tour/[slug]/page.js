import { getPlaiceholder } from "plaiceholder";
import TourDetails from "./tourDetails";

async function fetchTourData(slug) {
    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        const response = await fetch(`${apiPoint}api/group-tours/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch tour data");
        return response.json();
    } catch (error) {
        console.error("Error fetching tour data:", error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = params;

    try {
        const tour = await fetchTourData(slug);

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
                    url: `https://tripwayholidays.in/group-tour/${slug}`,
                    type: "website",
                    images: [
                        {
                            url: imageUrl,
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
            },
        };
    } catch (error) {
        console.error("Metadata generation error:", error);

        return {
            title: "Group Tour Not Found",
            description: "No group tour information is currently available.",
            openGraph: {
                title: "Group Tours - Tripway Holidays",
                description: "Discover group tours with Tripway Holidays.",
            },
        };
    }
}

export default async function Page({ params }) {
    const { slug } = params;

    const imageUrl = process.env.IMAGE_URL;

    // Fetch tour data
    const tourData = await fetchTourData(slug);
    if (!tourData || !tourData.imageUrl) {
        return <div>Error loading tour details.</div>;
    }

    const fullImageUrl = `${imageUrl}${tourData.imageUrl}`;

    try {
        const res = await fetch(fullImageUrl);

        if (!res.ok) {
            return <div>Error loading image.</div>;
        }
        const buffer = await res.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));

        return <TourDetails tourData={tourData} blurImg={base64} />;
    } catch (error) {
        return <div>Error processing image.</div>;
    }
}
