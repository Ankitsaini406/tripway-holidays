"use client";

import styles from "@/styles/pages/selectCabs.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingSuccessContent() {
    const searchParams = useSearchParams();

    const name = searchParams.get("name");
    const triptpye = searchParams.get("triptpye");
    const amount = searchParams.get("amount");
    const paymentId = searchParams.get("paymentId");

    const isCabBooking = ["one-way", "round-trip", "multi-city"].includes(triptpye);

    const formattedTripType = triptpye
        ? triptpye.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
        : "";

    return (
        <div className={styles.successPage}>
            <div className={styles.card}>
                <div className={styles.checkmarkWrapper}>
                    <div className={styles.checkmark}></div>
                </div>
                <h3>Hey {name},</h3>
                <h1>
                    {isCabBooking ? "Your Cab is Confirmed! 🚖" : "Your Group Tour is Confirmed! 🚍"}
                </h1>
                <p>We&apos;ve received your payment of <strong>₹{amount}</strong> for the <strong>{formattedTripType}</strong>.</p>
                <p>Your payment ID is: <strong>{paymentId}</strong></p>
                <p>We&apos;ll send you a confirmation message shortly.</p>
                <Link href="/" className={styles.button}>Go Back to Home</Link>
            </div>
        </div>
    );
}