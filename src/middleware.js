import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl; // ✅ Correctly accessing pathname

    if (pathname === "/") {
        console.log("Skipping middleware for login page.");
        return NextResponse.next();
    }

    // ✅ Correctly access cookies using `request.cookies`
    const cookie = request.cookies.get("bookingToken")?.value;

    // If there's no authToken, redirect to login
    if (!cookie) {
        console.log("No auth token found. Redirecting to login.");
        return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Correctly check multiple route conditions
    if (pathname.startsWith("/select-cabs") || pathname.startsWith("/booking-success")) {
        console.log("Unauthorized access detected. Redirecting.");
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// ✅ Apply middleware only to specific paths
export const config = {
    matcher: ["/select-cabs/:path*", "/booking-success/:path*"],
};
