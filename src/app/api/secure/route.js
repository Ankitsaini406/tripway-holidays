import { createToken } from "@/utils/Utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const token = createToken({ body });

        if (!token) {
            throw new Error("Token generation failed");
        }

        const cookieStore = await cookies();
        cookieStore.set("bookingToken", token, { maxAge: 60 * 60 * 24 });

        return NextResponse.json({ token }, { status: 201 });
    } catch (error) {
        console.error("Error in API /secure:", error);
        return NextResponse.json({ error: "Error processing request" }, { status: 500 });
    }
}
