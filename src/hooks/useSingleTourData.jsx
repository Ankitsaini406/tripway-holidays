import axios from "axios";
import { useEffect, useState } from "react";


export function useSingleTourData(url, id) {

    const [tour, setTour] = useState(null);
    const [singleLoading, setSingleLoading] = useState(true);
    const [singleError, setSingleError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const tourdata = response.data.find((item) => item.id === parseInt(id));
                if (!isMounted) {
                    setTour(tourdata);
                    setSingleError('');
                }
            } catch (err) {
                if (isMounted) setSingleError("Failed to load tour data. Please try again later.");
            } finally {
                if (isMounted) setSingleLoading(false);
            }
        };

        fetchData();
        return () => (isMounted = false);
    }, [url, id]);

    return { tour, singleLoading, singleError };
}