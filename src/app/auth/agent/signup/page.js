import SignUpPage from "./signup";

export const metadata = {
    title: "Agent Sign Up",
    description: "Create your account with Tripway Holidays. Agent Sign up today to explore personalized holiday packages, exclusive deals, and seamless bookings.",
    keywords: [
        "Agent Sign Up Tripway Holidays",
        "Agent Register Tripway Account",
        "Holiday Package Registration",
        "Create Agent Account Tripway Holidays",
        "Agent Sign Up for Trip Packages",
        "Tripway Holidays Agent Sign-Up Form",
        "Exclusive Holiday Deals Agent Sign-Up",
    ],
    openGraph: {
        title: "Agent Sign Up",
        description: "Join Tripway Holidays to unlock amazing travel experiences, curated holiday packages, and exclusive offers. Agent Sign up and get started on your journey today!",
        url: "https://tripwayholidays.in/auth/agent/signup",
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "Agent Sign Up for Tripway Holidays",
            },
        ],
    },
    meta: [
        { name: "robots", content: "index, follow" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "author", content: "Tripway Holidays - Agent Sign Up" },
        { name: "theme-color", content: "#ffffff" },
        { charset: "UTF-8" },
    ],
};

export default function Page() {
    return <SignUpPage />;
}
