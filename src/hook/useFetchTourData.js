'use client';

import { useState, useEffect } from "react";

export function useFetchTourData(url) {
    const [tourData, setTourData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const localApi = process.env.API_URL;
        const productionApi = process.env.HOST_URL;
        const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

        const fetchData = async () => {
            try {
                const response = await fetch(`${apiPoint}/api/${url}`);

                console.log(response.url);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                if (isMounted) {
                    setTourData(data);
                    setError("");
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load tour data. Please try again later.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return { tourData, loading, error };
}
