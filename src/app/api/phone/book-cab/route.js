import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received API Request Body:", body);

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

        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Unexpected Response from External API:", text);
            return NextResponse.json({ error: "Invalid response from WhatsApp API", details: text }, { status: 500 });
        }

        const data = await response.json();
        console.log("WhatsApp book cab data : ", data);

        if (!response.ok) {
            return NextResponse.json({ error: data, status: response.status }, { status: response.status });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
