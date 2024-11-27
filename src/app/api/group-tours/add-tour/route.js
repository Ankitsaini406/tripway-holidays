import { firestore } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { tourName, price, userName, userEmail, userPhoneNumber, tourDate, userFrom, passenger } = await req.json();

        const tourRef = collection(firestore, "user-tours");

        // Prepare tour data
        const tourUserData = {
            tourName,
            price,
            userName,
            userPhoneNumber,
            userEmail,
            tourDate,
            userFrom,
            passenger,
        };

        // Add the tour data to Firestore
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
