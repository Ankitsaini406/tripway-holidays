export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const origin = searchParams.get("origin");
        const destination = searchParams.get("destination");
        const apiKey = process.env.GOOGLE_MAP_API; // Ensure this is set in .env.local

        if (!origin || !destination) {
            return Response.json({ error: "Missing required parameters" }, { status: 400 });
        }

        const googleApiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
        const googleApiUrl2 =`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=Jaipur&origins=Sikar&units=imperial&key=AIzaSyDWd8D9b2DU1JBDDUhcHckUHIu3icSTtSE`;

        console.log("Requesting Google API:", googleApiUrl); // Debugging log

        const response = await fetch(googleApiUrl);
        const data = await response.json();

        console.log("Google API Response:", data); // Log API response

        if (data.status !== "OK") {
            return Response.json({ error: `Google API Error: ${data.status}` }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error("Error fetching distance:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
