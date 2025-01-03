
export default async function sitemap() {

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    const response = await fetch(`${apiPoint}api/group-tours`);
    if (!response.ok) {
        throw new Error("Failed to fetch tour data");
    }

    const data = await response.json();

    const tourDetails = data?.map((tour) => {
        return {
            url: `${apiPoint}group-tours/${tour?.slug}`,
            lastModified: tour?.createdAt,
        };
    });

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
            url: `${apiPoint}contact_us`,
            lastModified: new Date().toISOString(),
        },
    ];

    return [
        {
            url: `${apiPoint}`,
            lastModified: new Date(),
        },
        ...tourDetails,
        ...staticPages,
    ]
}