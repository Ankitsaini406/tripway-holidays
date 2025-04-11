import ClientLoaginPage from "./userLoginPage";

export const metadata = {
    title: "User Login",
    description: "Access your Tripway Holidays account. User Log in to manage your bookings, explore exclusive holiday packages, and more.",
    keywords: [
        "User Login Tripway Holidays",
        "Access Tripway Account",
        "Holiday Booking User Login",
        "Tripway Holidays User Login Page",
        "Sign In for Trip Packages",
        "Manage Tripway Bookings",
        "Tripway Holidays User Login Form",
    ],
    openGraph: {
        title: "User Login",
        description: "User Log in to your Tripway Holidays account and manage your travel bookings, explore personalized holiday packages, and enjoy seamless experiences.",
        url: "https://tripwayholidays.in/auth/user/login",
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "User Login to Tripway Holidays",
            },
        ],
    },
    meta: [
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "author", content: "Tripway Holidays - User Login" },
        { name: "theme-color", content: "#ffffff" },
        { charset: "UTF-8" },
    ],
};

export default async function Page() {
    return <ClientLoaginPage />;
}
