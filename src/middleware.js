import { NextResponse } from "next/server";

export function middleware(req) {
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    // Attach query params to headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-from", from);
    requestHeaders.set("x-to", to);

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
}

// Apply middleware to specific routes (e.g., `/cabs/select-cabs`)
export const config = {
    matcher: "/cabs/select-cabs",
};
