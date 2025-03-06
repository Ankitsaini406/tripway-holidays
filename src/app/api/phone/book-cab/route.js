import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        
        if (!body.apiKey) {
            return NextResponse.json({ error: "API key is missing" }, { status: 400 });
        }

        const response = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data, status: response.status }, { status: response.status });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
