import { firestore } from "@/firebase/firebaseConfig";
import { NextResponse } from "next/server";
import { getDoc, doc } from "firebase/firestore";

export async function GET(req, { params }) {
    try {
        // Await the params before accessing them
        const { id } = await params;  // This should be awaited properly
        
        if (!id) {
            return NextResponse.json({ error: "ID not provided" }, { status: 400 });
        }

        const tourDocRef = doc(firestore, "group-tours", id);
        const tourDoc = await getDoc(tourDocRef);

        if (!tourDoc.exists()) {
            return NextResponse.json({ error: "Tour not found" }, { status: 404 });
        }

        const tour = {
            id: tourDoc.id,
            ...tourDoc.data(),
        };

        return NextResponse.json(tour, { status: 200 });
    } catch (error) {
        console.error("Error fetching tour: ", error);
        return NextResponse.json({ error: "Error fetching tour" }, { status: 500 });
    }
}
