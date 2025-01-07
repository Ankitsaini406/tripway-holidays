import AgentLoginPage from "./agentLogin";

export const metadata = {
    title: "Agent Login",
    description: "Log in to your Tripway Holidays agent account. Manage bookings, access client details, and explore exclusive resources designed for agents.",
    keywords: [
        "Agent Login Tripway Holidays",
        "Agent Portal Login",
        "Tripway Holidays Agent Account",
        "Login for Travel Agents",
        "Manage Bookings Agent Portal",
        "Agent Sign In Tripway",
        "Tripway Holidays Agent Login Page",
    ],
    openGraph: {
        title: "Agent Login",
        description: "Access your Tripway Holidays agent account. Log in to manage client bookings, view travel packages, and leverage tools to enhance your services.",
        url: "https://tripwayholidays.in/auth/agent-login",
        type: "website",
        images: [
            {
                url: "/favicon-512.png",
                width: 400,
                height: 400,
                alt: "Agent Login to Tripway Holidays",
            },
        ],
    },
};

export default function Page() {
    return <AgentLoginPage />;
}
