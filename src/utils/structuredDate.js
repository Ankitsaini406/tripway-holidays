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
    "@type": "TravelAgency",
    "url": "https://tripwayholidays.in/group-tour",
    "name": "Explore Tours with TripWay Holidays",
    "description": "Discover the best holiday packages and tours with TripWay Holidays. Explore top destinations, affordable travel plans, and personalized itineraries.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Tour Packages",
        "itemListElement": tours.map(tour => ({
            "@type": "Offer",
            "name": tour.name,
            "description": tour.description,
            "url": `https://tripwayholidays.in/group-tour/${tour.slug}`,
            "priceCurrency": "INR",
            "price": tour.price,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "TripWay Holidays"
            }
        }))
    }
});

export const generateBlogsStructuredData = (blogs) => ({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TripWay Holidays Travel Blog",
    "url": "https://tripwayholidays.in/blog",
    "description": "Read travel tips, guides, and destination recommendations on the TripWay Holidays travel blog.",
    "publisher": {
        "@type": "Organization",
        "name": "TripWay Holidays",
        "logo": {
            "@type": "ImageObject",
            "url": "https://tripwayholidays.in/favicon.ico"
        },
        "sameAs": [
            "https://www.facebook.com/tripwayholidays",
            "https://www.instagram.com/tripwayholiday",
            "https://www.twitter.com/tripwayholidays",
            "https://www.youtube.com/@tripwayholidays",
            "https://x.com/tripwayholidays"
        ]
    },
    "blogPosts": blogs.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "url": `https://tripwayholidays.in/blog/${post.slug}`,
        "datePublished": new Date(post.timestamp * 1000).toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author
        }
    }))
});

export const structuredData = {
    oneWay: {
        ...baseData,
        "@type": "TravelAgency",
        "url": "https://tripwayholidays.in/cabs/one-way",
        "name": "Explore Tours with TripWay Holidays",
        "description": "Need a hassle-free ride to your destination? TripWay Holidays offers reliable and affordable one-way cab services for a smooth travel experience. Whether you're heading to the airport, another city, or any location, our professional drivers ensure a safe and timely journey.",
        "hasOfferCatalog": {
            "@type": "Service",
            "name": "One Way Cabs",
            "description": "Book affordable one-way cabs with TripWay Holidays. Enjoy safe, comfortable, and timely rides with professional drivers.",
            "serviceType": "One Way Taxi",
            "url": "https://tripwayholidays.in/cabs/one-way",
            "provider": { "@type": "TravelAgency", "name": "TripWay Holidays" }
        },
    },
    roundTrip: {
        ...baseData,
        "@type": "TravelAgency",
        "url": "https://tripwayholidays.in/cabs/round-trip",
        "name": "Explore Tours with TripWay Holidays",
        "description": "Planning a return journey? Our round-trip cab service provides a convenient travel solution at competitive prices. Enjoy comfortable rides with experienced drivers, flexible booking options, and top-notch service for both leisure and business trips.",
        "hasOfferCatalog": {
            "@type": "Service",
            "name": "Round Trip Cabs",
            "description": "Get the best round-trip cab service with affordable fares. Safe and reliable rides for all your travel needs.",
            "serviceType": "Round Trip Taxi",
            "url": "https://tripwayholidays.in/cabs/round-trip",
            "provider": { "@type": "TravelAgency", "name": "TripWay Holidays" }
        },
    },
    multiCity: {
        ...baseData,
        "@type": "TravelAgency",
        "url": "https://tripwayholidays.in/cabs/multi-city",
        "name": "Explore Tours with TripWay Holidays",
        "description": "Explore multiple destinations with ease using our multi-city cab services. Ideal for road trips, business tours, or exploring different cities in one go. Enjoy seamless travel with TripWay Holidays, ensuring comfort, safety, and affordability.",
        "hasOfferCatalog": {
            "@type": "Service",
            "name": "Multi-City Cabs",
            "description": "Explore multiple destinations with our multi-city cab services. Easy booking and a seamless travel experience.",
            "serviceType": "Multi City Taxi",
            "url": "https://tripwayholidays.in/cabs/multi-city",
            "provider": { "@type": "TravelAgency", "name": "TripWay Holidays" }
        },
    }
};
