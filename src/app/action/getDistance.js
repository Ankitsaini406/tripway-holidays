export async function getDistance(from, to) {
    if (!from || !to) return null;

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    try {
        const res = await fetch(`${apiPoint}/api/google/distance?origin=${from}&destination=${to}`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch distance");

        const data = await res.json();
        
        // Extract distance text
        const distText = data?.rows?.[0]?.elements?.[0]?.distance?.text;
        if (!distText) throw new Error("Distance not found in API response");

        // Convert distance to numeric value
        let distValue = parseFloat(distText.replace(/[^\d.]/g, ""));
        
        // Check if the distance is in miles and convert to km
        if (distText.includes("mi")) {
            distValue = (distValue * 1.60934).toFixed(2);
        } else {
            distValue = distText; // Already in km
        }

        return distValue;
    } catch (error) {
        console.error("Error fetching distance:", error);
        return null;
    }
}
