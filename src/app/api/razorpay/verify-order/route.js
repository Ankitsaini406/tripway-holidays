import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { orderId, razorpayPaymentId, razorpaySignature } = await req.json();

        const keySecret = process.env.RAZORPAY_LIVE_KEY;

        if (!orderId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json({ message: "Missing payment details", isOk: false }, { status: 404 });
        }

        const expectedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(`${orderId}|${razorpayPaymentId}`)
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            return NextResponse.json({ message: "Payment verification failed", isOk: false }, { status: 400 });
        }

        return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 });

    } catch (error) {
        console.error("Payment Verification Error:", error);
        return NextResponse.json({ message: "Internal Server Error", isOk: false }, { status: 500 });
    }
}
