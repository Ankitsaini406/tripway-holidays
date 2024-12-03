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
    },
};

export default nextConfig;
