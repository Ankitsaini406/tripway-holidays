
export default async function sitemap() {

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    const tourResponse = await fetch(`${apiPoint}api/group-tours`);
    if (!tourResponse.ok) {
        throw new Error("Failed to fetch tour data");
    }
    const tours = await tourResponse.json();

    const blogResponse = await fetch(`${apiPoint}api/blog`);
    if (!blogResponse.ok) {
        throw new Error("Failed to fetch blog data");
    }
    const blog = await blogResponse.json();

    const tourDetails = tours?.map((tour) => {
        return {
            url: `${apiPoint}group-tours/${tour?.slug}`,
            lastModified: tour?.createdAt,
        };
    });

    const blogDetails = blog?.map((blog) => {
        return {
            url: `${apiPoint}blog/${blog?.slug}`,
            lastModified: blog?.createdAt,
        }
    })

    const staticPages = [
        {
            url: `${apiPoint}group-tour`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}about`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}contact-us`,
            lastModified: new Date().toISOString(),
        },
    ];

    return [
        {
            url: `${apiPoint}`,
            lastModified: new Date(),
        },
        ...tourDetails,
        ...blogDetails,
        ...staticPages,
    ]
}