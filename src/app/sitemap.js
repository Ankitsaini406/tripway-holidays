
export default async function sitemap() {

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

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
            url: `${apiPoint}group-tour/${tour?.slug}`,
            lastModified: new Date().toISOString(),
        };
    });

    const blogDetails = blog?.map((blog) => {
        return {
            url: `${apiPoint}blog/${blog?.slug}`,
            lastModified: new Date().toISOString(),
        }
    })

    const staticPages = [
        {
            url: `${apiPoint}group-tour`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}cabs/one-way`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}cabs/round-trip`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}cabs/multi-city`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}about-us`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}contact-us`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}privacy-policy`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}terms-and-condition`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}return-policy`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}auth/user/login`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}auth/user/signup`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}auth/agent/login`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}auth/agent/signup`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}auth/driver/login`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}auth/driver/signup`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${apiPoint}profile`,
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