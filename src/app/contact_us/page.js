
export const metadata = {
    title: "Contact Us",
    description: "Get in touch with Tripway Holidays. Reach out to us for inquiries, support, or feedback. Fill out our contact form or visit us at our location.",
    keywords: [
        "Contact WeBrainTech",
        "Get in Touch",
        "Contact Form",
        "Tripway Holidays Address",
        "Support and Inquiry",
        "WeBrainTech Location",
        "WeBrainTech Contact Details",
    ],
    openGraph: {
        title: "Contact Us",
        description: "Reach out to Tripway Holidays for inquiries, support, or to learn more about our services. Visit our office or drop us a message today!",
        url: "https://tripwayholidays.in/contact_us",
        type: "website",
        images: [
            {
                url: "/contact.jpg",
                width: 1200,
                height: 630,
                alt: "Tripway Holidays Contact Banner",
            },
        ],
    },
};

import ContactUs from "./contactUs";

export default function Page() {
    return <ContactUs />;
}