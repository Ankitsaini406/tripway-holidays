import DriverLoginPage from "./Driverlogin";

export const metadata = {
    title: "Driver Login",
    description: "Log in to your Tripway Holidays agent account. Manage bookings, access client details, and explore exclusive resources designed for agents.",
    keywords: [
        "Driver Login Tripway Holidays",
        "Driver Portal Login",
        "Tripway Holidays Driver Account",
        "Login for Drivers",
        "Manage Bookings Driver Portal",
        "Driver Sign In Tripway",
        "Tripway Holidays Driver Login Page",
    ],
    openGraph: {
        title: "Driver Login",
        description: "Access your Tripway Holidays agent account. Log in to manage client bookings, view travel packages, and leverage tools to enhance your services.",
        url: "https://tripwayholidays.in/auth/driver/login",
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "Driver Login to Tripway Holidays",
            },
        ],
    },
    meta: [
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "author", content: "Tripway Holidays - Driver Login" },
        { name: "theme-color", content: "#ffffff" },
        { charset: "UTF-8" },
    ],
};

export default async function Page() {
    return <DriverLoginPage />
}