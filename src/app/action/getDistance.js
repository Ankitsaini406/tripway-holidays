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

function convertToPipeSeparated(destination) {
    const decodedDestination = decodeURIComponent(destination);
    const formattedDestination = decodedDestination.replace(/,/g, "|");
    return formattedDestination;
}

export async function getTotalDistance(places) {
    if (!places || places.length < 2) {
        console.error("At least two places are required.");
        return null;
    }

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    let totalDistance = 0;

    try {

        for (let i = 0; i < places.length - 1; i++) {
            // Ensure each location is properly encoded
            const from = encodeURIComponent(places[i]);
            const to = encodeURIComponent(places[i + 1]);

            const tos = convertToPipeSeparated(to);

            const res = await fetch(`${apiPoint}/api/google/distances?origin=${from}&destination=${tos}`, {
                cache: "no-store",
            });

            if (!res.ok) throw new Error(`Failed to fetch distance from ${places[i]} to ${places[i + 1]}`);

            const data = await res.json();

            let totalDistanceInMeters = 0;
            data.rows[0].elements.forEach((element) => {
                totalDistanceInMeters += element.distance.value;
            });

            let totalDistanceInKilometers = totalDistanceInMeters / 1000;
            totalDistance += totalDistanceInKilometers;
        }
        return `${totalDistance.toFixed(2)}`;

    } catch (error) {
        console.error("Error calculating total distance:", error);
        return null;
    }
}
