import BlogSection from "./blogSection";
import { getPlaiceholder } from "plaiceholder";

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

async function fetchBlogData() {

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        const response = await fetch(`${apiPoint}api/blog`);
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

    const imageUrl = process.env.BLOG_URL;
    const blogData = await fetchBlogData();

    if (!blogData || blogData.length === 0) {
        console.error("No blog data found.");
        return <div>No blog available.</div>;
    }

    const allImages = await Promise.all(
        blogData.map(async (blog) => {

            const isProduction = process.env.NODE_ENV === 'production';
            const fullImageUrl = `${imageUrl}${blog.image}${isProduction ? `?t=${new Date().getTime()}` : ''}`;

            // const fullImageUrl = `${imageUrl}${blog.image}`;
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

    return <BlogSection blogData={blogData} allImages={allImages} />;
}
