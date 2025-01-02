import { getPlaiceholder } from "plaiceholder";
import dynamic from 'next/dynamic';
const TourDetails = dynamic(() => import('./tourDetails'));

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
    const { slug } = await params;

    try {
        const tour = await fetchTourData(slug);
        if (!tour) {
            return {
                title: "Group Tours | Tripway Holidays",
                description: "Explore our group tours and create unforgettable travel experiences.",
                openGraph: {
                    title: "Group Tours - Tripway Holidays",
                    description: "Join our group tours and visit exciting destinations.",
                    url: "https://tripwayholidays.in/group-tour",
                },
            };
        };

            return {
                title: `${tour.name}`,
                description: `Join our exclusive group tour to experience ${tour.description}. A perfect adventure for travel lovers.`,
                keywords: [
                    "Group Tour",
                    "Tripway Holidays",
                    "Adventure Tour",
                    "Travel Packages",
                    "Book Group Tour",
                    tour.name,
                    tour.startDate,
                ],
                openGraph: {
                    title: `Group Tour: ${tour.name}`,
                    description: `Explore our ${tour.name} tour. Book now and enjoy unforgettable experiences.`,
                    url: `https://tripwayholidays.in/group-tour/${tour.slug}`,
                    type: "website",
                    images: [
                        {
                            url: tour.imageUrl,
                            width: 400,
                            height: 400,
                            alt: `Tripway Holidays ${tour.name} Tour`,
                        },
                    ],
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
    const { slug } = await params;

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
