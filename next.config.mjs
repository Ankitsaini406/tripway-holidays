/** @type {import('next').NextConfig} */

import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
    images: {
        domains: [
            "tripwayholidays.in",
            "images.unsplash.com",
            "tripwayholidays",
            "tripway-holidays.vercel.app",
            "upload.wikimedia.org",
        ],
    },
    env: {
        API_URL: process.env.LOCAL_HOST_URL,
        HOST_URL: process.env.HOST_URL,
        APP_EMAIL: process.env.NEXT_APP_EMAIL,
        APP_PASSWORD: process.env.NEXT_APP_PASSWORD,
        IMAGE_URL: process.env.NEXT_IMAGE_URL,
        BOT_URL: process.env.NEXT_APP_BOT_URL,
        GA_TRACKING_ID: process.env.NEXT_APP_GA_TRACKING_ID,
        GTM_TRACKING_ID: process.env.NEXT_APP_GTM_TRACKING_ID,
        FIREBASE_API_KEY: process.env.NEXT_FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL: process.env.NEXT_FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID: process.env.NEXT_FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.NEXT_FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.NEXT_FIREBASE_MEASUREMENT_ID,
    },

    async redirects() {
        return [
            {
                source: "/robots.txt",
                destination: "/api/robots",
                permanent: true,
            },
        ];
    },

    async headers() {
        return [
            {
                source: "/videos/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Origin, Content-Type, Accept",
                    },
                ],
            },
        ];
    },
    // webpack(config) {
    //     // Example Webpack customizations
    //     config.resolve.alias['@components'] = path.join(__dirname, 'components');
    //     return config;
    // },
};

export default nextConfig;
