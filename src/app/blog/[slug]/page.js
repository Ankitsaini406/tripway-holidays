import { getPlaiceholder } from "plaiceholder";
import dynamic from 'next/dynamic';
const BlogDetails = dynamic(() => import('./blogComponet'));

async function fetchBlogData(slug) {
    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    try {
        const response = await fetch(`${apiPoint}api/blog/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch blog data");
        return response.json();
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const blog = await fetchBlogData(slug);
        if (!blog) {
            return {
                title: "Blog | Tripway Holidays",
                description: "Explore travel tips, guides, and inspiring stories on Tripway Holidays blog.",
                openGraph: {
                    title: "Blog - Tripway Holidays",
                    description: "Read articles and guides about your next travel adventure with Tripway Holidays.",
                    url: "https://tripwayholidays.in/blog",
                },
            };
        }

        return {
            title: `${blog.title}`,
            description: blog.description || `Read more about ${blog.title} on Tripway Holidays blog.`,
            keywords: [
                "Travel Blog",
                "Tripway Holidays Blog",
                "Travel Tips",
                "Destination Guides",
                "Holiday Inspiration",
                blog.title,
            ],
            openGraph: {
                title: `${blog.title}`,
                description: blog.description || `Explore the details of ${blog.title} on Tripway Holidays blog.`,
                url: `https://tripwayholidays.in/blog/${blog.slug}`,
                type: "website",
                images: [
                    {
                        url: blog.image,
                        width: 1200,
                        height: 630,
                        alt: `${blog.title} image`,
                    },
                ],
            },
        };
    } catch (error) {
        console.error("Metadata generation error:", error);

        return {
            title: "Blog Post Not Found",
            description: "No blog post found with the given details.",
            openGraph: {
                title: "Blog - Tripway Holidays",
                description: "Explore articles and guides about travel with Tripway Holidays.",
            },
        };
    }
}

export default async function Page({ params }) {
    const { slug } = await params;

    const imageUrl = process.env.BLOG_URL;

    // Fetch blog data
    const blogData = await fetchBlogData(slug);
    if (!blogData || !blogData.image) {
        return <div>Error loading blog details.</div>;
    }

    const fullImageUrl = `${imageUrl}${blogData.image}`;

    try {
        const res = await fetch(fullImageUrl);

        if (!res.ok) {
            return <div>Error loading image.</div>;
        }
        const buffer = await res.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));

        return <BlogDetails blogData={blogData} blurImg={base64} />;
    } catch (error) {
        return <div>Error processing image.</div>;
    }
}
