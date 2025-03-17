/** @type {import('next').NextConfig} */

import dotenv from "dotenv";

dotenv.config();

const nextConfig = {
    images: {
        domains: [
            "tripwayholidays.in",
            "tripway-holidays.vercel.app",
            "upload.wikimedia.org",
        ],
    },
    env: {
        API_URL: process.env.LOCAL_HOST_URL,
        HOST_URL: process.env.HOST_URL,
        APP_EMAIL: process.env.NEXT_APP_EMAIL,
        APP_PASSWORD: process.env.NEXT_APP_PASSWORD,
        RAZORPAY_ID: process.env.NEXT_APP_RAZORPAY_ID,
        RAZORPAY_KEY: process.env.NEXT_APP_RAZORPAY_KEY,
        RAZORPAY_LIVE_ID: process.env.NEXT_APP_RAZORPAY_LIVE_ID,
        RAZORPAY_LIVE_KEY: process.env.NEXT_APP_RAZORPAY_LIVE_KEY,
        IMAGE_URL: process.env.NEXT_IMAGE_URL,
        BLOG_URL: process.env.NEXT_BLOG_IMAGE_URL,
        BOT_URL: process.env.NEXT_APP_BOT_URL,
        GA_TRACKING_ID: process.env.NEXT_APP_GA_TRACKING_ID,
        GTM_TRACKING_ID: process.env.NEXT_APP_GTM_TRACKING_ID,
        FACEBOOK_ID: process.env.NEXT_APP_FACEBOOK_ID,
        FIREBASE_API_KEY: process.env.NEXT_FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL: process.env.NEXT_FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID: process.env.NEXT_FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.NEXT_FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.NEXT_FIREBASE_MEASUREMENT_ID,
        GOOGLE_MAP_API: process.env.NEXT_APP_GOOGLE_MAP_API,
        JWT_SECRET_KEY: process.env.NEXT_APP_JWT_SECRET_KEY,
        AI_SENSY: process.env.NEXT_APP_AI_SENSY,
    },

    async rewrites() {
        return [
            {
                source: '/tour-images/:path*',
                destination: 'https://tripwayholidays.in/tour-images/:path*', // Replace with Hostinger's direct static file serving URL
            },
        ];
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
