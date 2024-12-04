import { firestore } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { tourName, price, userName, userEmail, userPhoneNumber, tourDate, userFrom, passenger, isPast } = await req.json();

        // Prepare tour data
        const tourUserData = {
            passenger,
            price,
            tourDate,
            tourName,
            userEmail,
            userFrom,
            userName,
            userPhoneNumber,
            isPast,
        };

        const tourRef = collection(firestore, "user-tours");
        await addDoc(tourRef, tourUserData);

        return new NextResponse(JSON.stringify({ message: "Tour created successfully!" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Error creating tour:", error);
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
}
