import ClientLoaginPage from "./clientLogin";

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

export const metadata = {
    title: "Login",
    description: "Access your Tripway Holidays account. Log in to manage your bookings, explore exclusive holiday packages, and more.",
    keywords: [
        "Login Tripway Holidays",
        "Access Tripway Account",
        "Holiday Booking Login",
        "Tripway Holidays Login Page",
        "Sign In for Trip Packages",
        "Manage Tripway Bookings",
        "Tripway Holidays Login Form",
    ],
    openGraph: {
        title: "Login",
        description: "Log in to your Tripway Holidays account and manage your travel bookings, explore personalized holiday packages, and enjoy seamless experiences.",
        url: `${apiPoint}auth/client-login`,
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "Login to Tripway Holidays",
            },
        ],
    },
};

export default function Page() {
    return <ClientLoaginPage />
}
