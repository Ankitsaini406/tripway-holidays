const baseData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "TripWay Holidays",
    "url": "https://tripwayholidays.in/",
    "logo": "https://tripwayholidays.in/favicon.ico",
    "description": "TripWay Holidays offers one-way, round-trip, and multi-city cab services for hassle-free travel experiences.",
    "telephone": "+91-8890906400",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Opp. Mangal Transport, Near Chandpool Gate",
        "addressLocality": "Sikar",
        "addressRegion": "Rajasthan",
        "postalCode": "332001",
        "addressCountry": "IN"
    },
    "sameAs": [
        "https://www.facebook.com/tripwayholidays",
        "https://www.instagram.com/tripwayholiday",
        "https://www.twitter.com/tripwayholidays",
        "https://www.youtube.com/@tripwayholidays",
        "https://x.com/tripwayholidays"
    ]
};

export const generateToursStructuredData = (tours) => ({
    ...baseData,
    "@type": "TouristAttraction",
    "url": "https://tripwayholidays.in/group-tour",
    "name": "Explore Tours with TripWay Holidays",
    "description": "Discover the best holiday packages and tours with TripWay Holidays. Explore top destinations, affordable travel plans, and personalized itineraries.",
    "offers": tours.map(tour => ({
        "@type": "TravelAgency",
        "name": tour.name,
        "description": tour.description,
        "url": `https://tripwayholidays.in/group-tour/${tour.slug}`,
        // "priceCurrency": "INR",
        // "price": tour.price,
        // "availability": "https://schema.org/InStock"
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Opp. Mangal Transport, Near Chandpool Gate",
            "addressLocality": "Sikar",
            "addressRegion": "Rajasthan",
            "postalCode": "332001",
            "addressCountry": "IN"
        },
    }))
});

export const generateBlogsStructuredData = (blogs) => ({
    ...baseData,
    "@type": "Blog",
    "url": "https://tripwayholidays.in/blog",
    "name": "TripWay Holidays Travel Blog",
    "description": "Read travel tips, guides, and destination recommendations on the TripWay Holidays travel blog.",
    "offers": blogs.map(blog => ({
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.description,
        "url": `https://tripwayholidays.in/blog/${blog.slug}`,
        "datePublished": blog.createdAt,
        "author": {
            "@type": "Person",
            "name": blog.writenBy ? blog.writenBy : "TripWay Holidays"
        }
    }))
});

export const structuredData = {
    oneWay: {
        ...baseData,
        "offers": [{
            "@type": "Service",
            "name": "One Way Cabs",
            "description": "Book affordable one-way cabs with TripWay Holidays. Enjoy safe, comfortable, and timely rides with professional drivers.",
            "serviceType": "One Way Taxi",
            "url": "https://tripwayholidays.in/cabs/one-way",
            "provider": { "@type": "TravelAgency", "name": "TripWay Holidays" }
        }]
    },
    roundTrip: {
        ...baseData,
        "offers": [{
            "@type": "Service",
            "name": "Round Trip Cabs",
            "description": "Get the best round-trip cab service with affordable fares. Safe and reliable rides for all your travel needs.",
            "serviceType": "Round Trip Taxi",
            "url": "https://tripwayholidays.in/cabs/round-trip",
            "provider": { "@type": "TravelAgency", "name": "TripWay Holidays" }
        }]
    },
    multiCity: {
        ...baseData,
        "offers": [{
            "@type": "Service",
            "name": "Multi-City Cabs",
            "description": "Explore multiple destinations with our multi-city cab services. Easy booking and a seamless travel experience.",
            "serviceType": "Multi City Taxi",
            "url": "https://tripwayholidays.in/cabs/multi-city",
            "provider": { "@type": "TravelAgency", "name": "TripWay Holidays" }
        }]
    }
};
