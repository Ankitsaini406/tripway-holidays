import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { route } = await req.json(); // Get the route from request body

        const url = 'https://distanceto.p.rapidapi.com/distance/route?sea=false';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '8f17baf190mshb1f9208f05a48ecp15cea0jsn2295a71d1d0d', // Use environment variable for security
                'x-rapidapi-host': 'distanceto.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ route }) // Send the route in JSON format
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return NextResponse.json(result, {status: 200}); // Send the API response to the frontend

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
