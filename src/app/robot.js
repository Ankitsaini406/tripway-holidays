
export default function robots() {

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    return {
        rules: {
            userAgent: '*',
            allow: ["/", "/group-tour", "/blog"],
            disallow: [],
        },
        sitemap: `${apiPoint}sitemap.xml`,
    }
}