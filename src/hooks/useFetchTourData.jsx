import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchTourData(url) {
    const [tourData, setTourData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const { data } = await axios.get(url);
                if (isMounted) {
                    setTourData(data);
                    setError("");
                }
            } catch (err) {
                if (isMounted) setError("Failed to load tour data. Please try again later.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();
        return () => (isMounted = false);
    }, [url]);

    return { tourData, loading, error };
}
