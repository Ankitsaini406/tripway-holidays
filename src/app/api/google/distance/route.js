export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const origin = searchParams.get("origin");
        const destination = searchParams.get("destination");
        const apiKey = process.env.GOOGLE_MAP_API; 

        if (!origin || !destination) {
            return Response.json({ error: "Missing required parameters" }, { status: 400 });
        }

        const googleApiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&units=imperial&key=${apiKey}`;

        console.log("Requesting Google API:", googleApiUrl);

        const response = await fetch(googleApiUrl);
        const data = await response.json();

        console.log("Google API Response:", data); 

        if (data.status !== "OK") {
            return Response.json({ error: `Google API Error: ${data.status}` }, { status: 401 });
        }

        return Response.json(data);
    } catch (error) {
        console.error("Error fetching distance:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
