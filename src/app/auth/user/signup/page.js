import SignUpPage from "./signup";

export const metadata = {
    title: "User Sign Up",
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
        title: "User Sign Up",
        description: "Join Tripway Holidays to unlock amazing travel experiences, curated holiday packages, and exclusive offers. User Sign up and get started on your journey today!",
        url: "https://tripwayholidays.in/auth/user/signup",
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
    meta: [
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "author", content: "Tripway Holidays - Sign Up" },
        { name: "theme-color", content: "#ffffff" },
        { charset: "UTF-8" },
    ],
};

export default function Page() {
    return <SignUpPage />;
}
