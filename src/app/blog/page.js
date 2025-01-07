import BlogSection from "./blogSection";

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

export const metadata = {
    title: "Blog",
    description: "Discover travel tips, destination guides, and inspiring stories. Stay updated with the latest trends and insights from the world of travel with Tripway Holidays.",
    keywords: [
        "Travel Blog",
        "Tripway Holidays Blog",
        "Travel Tips",
        "Destination Guides",
        "Holiday Inspiration",
        "Travel Stories",
        "Latest Travel Trends",
    ],
    openGraph: {
        title: "Blog | Tripway Holidays",
        description: "Explore our travel blog for expert tips, breathtaking destinations, and inspiring stories to fuel your wanderlust. Stay connected with Tripway Holidays.",
        url: `${apiPoint}blog`,
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 1200,
                height: 630,
                alt: "Tripway Holidays Blog Banner",
            },
        ],
    },
};

export default function Page() {
    return <BlogSection />;
}
