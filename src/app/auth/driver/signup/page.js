import DriverSignup from "./DriverSignup";

export const metadata = {
    title: "Driver Sign In",
    description: "Create your account with Tripway Holidays. Driver Sign up today to explore personalized holiday packages, exclusive deals, and seamless bookings.",
    keywords: [
        "Driver Sign Up Tripway Holidays",
        "Driver Register Tripway Account",
        "Holiday Package Registration",
        "Create Driver Account Tripway Holidays",
        "Driver Sign Up for Trip Packages",
        "Tripway Holidays Driver Sign-Up Form",
        "Exclusive Holiday Deals Driver Sign-Up",
    ],
    openGraph: {
        title: "Driver Sign Up",
        description: "Join Tripway Holidays to unlock amazing travel experiences, curated holiday packages, and exclusive offers. Driver Sign up and get started on your journey today!",
        url: "https://tripwayholidays.in/auth/dirver/signup",
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "Driver Sign Up for Tripway Holidays",
            },
        ],
    },
    meta: [
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "author", content: "Tripway Holidays - Driver Sign Up" },
        { name: "theme-color", content: "#ffffff" },
        { charset: "UTF-8" },
    ],
};

export default async function Page() {
    return <DriverSignup />;
}
