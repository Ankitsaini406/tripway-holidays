import { useEffect, useState } from "react";

export function useSingleTourData(url) {

    const [tour, setTour] = useState(null);
    const [singleLoading, setSingleLoading] = useState(true);
    const [singleError, setSingleError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://tripwayholidays.in/api/${url}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch tour data");
                }

                const data = await response.json();
                
                // Assuming the API returns a single tour object
                if (data) {
                    setTour(data); // Set the data directly as a single tour object
                    setSingleError('');
                } else {
                    // In case no data is returned for that id
                    throw new Error("Tour not found");
                }
            } catch (err) {
                if (isMounted) setSingleError("Failed to load tour data. Please try again later.");
            } finally {
                if (isMounted) setSingleLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]); // Depend on url and id

    return { tour, singleLoading, singleError };
}
