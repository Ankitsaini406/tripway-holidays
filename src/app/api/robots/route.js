
export async function GET() {

    // const localApi = process.env.API_URL;
    // const productionApi = process.env.HOST_URL;
    // const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    const robots = `
        User-agent: *
        Allow: /
        Disallow: /admin/
        Sitemap: https://tripwayholidays.in/sitemap.xml
    `;

    return new Response(robots.trim(), {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}