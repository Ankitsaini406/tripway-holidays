"use client"; // ✅ Mark as Client Component

import { useEffect, useState } from "react";
import AnimatedHero from "./AnimatedHero";

export default function AnimatedHeroWrapper() {
    const [imageUrl, setImageUrl] = useState("https://tripwayholidays.in/main-banenr.webp"); // ✅ Start with null

    const apiPoint = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_HOST_URL;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`${apiPoint}/api/image-url`);
                if (!response.ok) throw new Error("Failed to fetch image URL");
                
                const data = await response.json();
                setImageUrl(data.imageUrl);
            } catch (err) {
                console.error("Error fetching image:", err);
            }
        };

        fetchImage();
    }, [apiPoint]);


    // ✅ Render only when imageUrl is available
    return <AnimatedHero imageUrl={imageUrl} />;
}
