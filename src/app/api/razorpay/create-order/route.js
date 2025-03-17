import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_LIVE_ID,
    key_secret: process.env.RAZORPAY_LIVE_KEY,
});

export async function POST(req) {
    try {
        const { amount, name, email, contact } = await req.json();

        if (!amount || !name || !email || !contact) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const order = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            payment_capture: 1,
            notes: { name, email, contact },
        });

        return NextResponse.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Razorpay Error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create order" },
            { status: 500 }
        );
    }
}