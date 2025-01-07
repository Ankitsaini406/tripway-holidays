import SignUpPage from "./signup";

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

export const metadata = {

    title: "Sign Up",
    description: "Create your account with Tripway Holidays. Sign up today to explore personalized holiday packages, exclusive deals, and seamless bookings.",
    keywords: [
        "Sign Up Tripway Holidays",
        "Register Tripway Account",
        "Holiday Package Registration",
        "Create Account Tripway Holidays",
        "Sign Up for Trip Packages",
        "Tripway Holidays Sign-Up Form",
        "Exclusive Holiday Deals Sign-Up",
    ],
    openGraph: {
        title: "Sign Up",
        description: "Join Tripway Holidays to unlock amazing travel experiences, curated holiday packages, and exclusive offers. Sign up and get started on your journey today!",
        url: "https://tripwayholidays.in/auth/signup",
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "Sign Up for Tripway Holidays",
            },
        ],
    },
};

export default function Page() {
    return <SignUpPage />
}
