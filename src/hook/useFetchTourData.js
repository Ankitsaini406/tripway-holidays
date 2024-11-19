import { useState, useEffect } from "react";

export function useFetchTourData(type) {
    const [tourData, setTourData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        console.log('this is apitype: ', type);

        const fetchData = async () => {
            try {
                const endPoint = type === 'tours' ? 'tours' : 'group-tours';
                const response = await fetch(`api/${endPoint}`);

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
    }, [type]);

    return { tourData, loading, error };
}
