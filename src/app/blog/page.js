import Script from "next/script";
import BlogSection from "./blogSection";
import { generateBlogsStructuredData } from "@/utils/structuredDate";

const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

async function fetchBlogData() {
    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    try {

        const timestamp = Math.floor(Date.now() / 60000);
        const response = await fetch(`${apiPoint}api/blog`);

        if (!response.ok) {
            console.error(`API responded with status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch blog data:", error);
        return null;
    }
}

export async function generateMetadata() {

    return {
        title: `Blog`,
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
    }
};

export default async function Page() {

    // const imageUrl = process.env.BLOG_URL;
    const blogData = await fetchBlogData();

    if (!blogData || blogData.length === 0) {
        console.error("No blog data found.");
        return <div>No blog available.</div>;
    }

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogsStructuredData(blogData)) }}
            />
            <BlogSection blogData={blogData} />
        </>
    );
}
