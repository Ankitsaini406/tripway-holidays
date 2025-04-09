import { NextResponse } from "next/server";

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

        if (data.status !== "OK") {
            return NextResponse.json({ error: `Google API Error: ${data.status}` }, { status: 401 });
        }

        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.error("Error fetching distance:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
