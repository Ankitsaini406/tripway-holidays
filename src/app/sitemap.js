export default async function sitemap() {
    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    // Fetch dynamic tour data
    const response = await fetch(`${apiPoint}api/group-tours`);
    if (!response.ok) {
        throw new Error("Failed to fetch tour data");
    }

    const data = await response.json();

    // Generate dynamic tour URLs
    const tourDetails = data?.map((tour) => {
        return {
            url: `${apiPoint}group-tours/${tour?.slug}`,
            lastModified: `${new Date(tour?.createdAt).toISOString()}`,
        };
    });

    // Add static pages
    const staticPages = [
        {
            url: `${apiPoint}/group-tour`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}/about`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}/contact_us`,
            lastModified: new Date().toISOString(),
        },
    ];

    // Combine static pages and dynamic tour URLs
    return [
        {
            url: `${apiPoint}`,
            lastModified: new Date().toISOString(),
        },
        ...tourDetails,
        ...staticPages,
    ];
}
