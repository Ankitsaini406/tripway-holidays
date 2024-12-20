import { database, firestore } from "@/firebase/firebaseConfig";
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId, tourName, price, userName, userEmail, userPhoneNumber, startDate, userFrom, passenger, isPast, offerFrom } = await req.json();

        // Prepare tour data
        const tourUserData = {
            passenger,
            price,
            startDate,
            tourName,
            userEmail,
            userFrom,
            userName,
            userPhoneNumber,
            userId,
            isPast,
            offerFrom,
        };

        const tourRef = collection(firestore, "user-tours");
        const docRef = await addDoc(tourRef, tourUserData);

        const dbRef = ref(database, `users/${userId}/tours/${docRef.id}`);
        await set(dbRef, {
            tourId: docRef.id,
        });

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
