export const dynamic = "force-dynamic";

export default async function sitemap() {

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    const tourResponse = await fetch(`https://tripwayholidays.in/api/group-tours`);
    if (!tourResponse.ok) {
        throw new Error("Failed to fetch tour data");
    }
    const tours = await tourResponse.json();

    const blogResponse = await fetch(`https://tripwayholidays.in/api/blog`);
    if (!blogResponse.ok) {
        throw new Error("Failed to fetch blog data");
    }
    const blog = await blogResponse.json();

    const tourDetails = tours?.map((tour) => {
        return {
            url: `https://tripwayholidays.in/group-tour/${tour?.slug}`,
            lastModified: new Date().toISOString(),
        };
    });

    const blogDetails = blog?.map((blog) => {
        return {
            url: `https://tripwayholidays.in/blog/${blog?.slug}`,
            lastModified: new Date().toISOString(),
        }
    })

    const staticPages = [
        {
            url: `https://tripwayholidays.in/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/group-tour`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/cabs/one-way`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/cabs/round-trip`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/cabs/multi-city`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/about-us`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/contact-us`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/privacy-policy`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/terms-and-condition`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `https://tripwayholidays.in/return-policy`,
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
    ];

    return [
        {
            url: `https://tripwayholidays.in/`,
            lastModified: new Date(),
        },
        ...tourDetails,
        ...blogDetails,
        ...staticPages,
    ]
}