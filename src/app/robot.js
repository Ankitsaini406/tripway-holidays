
export default function robots() {

    const localApi = process.env.API_URL;
    const productionApi = process.env.HOST_URL;
    const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

    return {
        rules: {
            userAgent: '*',
            allow: ["/", "/group-tour"],
            disallow: [],
        },
        sitemap: `${apiPoint}sitemap.xml`,
    }
}