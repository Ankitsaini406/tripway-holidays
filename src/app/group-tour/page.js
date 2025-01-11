import TourPackages from "./touPackages";
import { getPlaiceholder } from "plaiceholder";

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
                primaryTour.name,
            ],
            openGraph: {
                title: `Group Tour: ${primaryTour.name}`,
                description: primaryTour.description,
                url: `https://tripwayholidays.in/group-tour/${primaryTour.slug}`,
                type: "website",
                images: [
                    {
                        url: `https://tripwayholidays.in/tour-image/${primaryTour.imageUrl}`,
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
    const imageUrl = process.env.IMAGE_URL;
    const tourData = await fetchTourData();

    if (!tourData || tourData.length === 0) {
        console.error("No tour data found.");
        return <div>No tours available.</div>;
    }

    const allImages = await Promise.all(
        tourData.map(async (tour) => {
            const fullImageUrl = `${imageUrl}${tour.imageUrl}`;

            try {
                const res = await fetch(fullImageUrl);
                if (!res.ok) {
                    console.error(`Error loading image: ${fullImageUrl}`);
                    return { url: fullImageUrl, placeholder: null }; // Fallback
                }

                const buffer = await res.arrayBuffer();
                const { base64 } = await getPlaiceholder(Buffer.from(buffer));

                return { url: fullImageUrl, placeholder: base64 };
            } catch (error) {
                console.error(`Error processing image: ${fullImageUrl}`, error);
                return { url: fullImageUrl, placeholder: null }; // Fallback
            }
        })
    );
    return <TourPackages tourData={tourData} allImages={allImages} />;
}

