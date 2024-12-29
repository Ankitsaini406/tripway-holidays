import { firestore } from "@/firebase/firebaseConfig";
import { NextResponse } from "next/server";
import { getDocs, collection, query, where } from "firebase/firestore";

export async function GET(req, { params }) {
    try {
        const { id:slug } = await params; // Directly access params

        if (!slug) {
            return NextResponse.json({ error: "Slug not provided" }, { status: 400 });
        }

        // Query Firestore for documents with the matching slug
        const tourCollection = collection(firestore, "group-tours");
        const slugQuery = query(tourCollection, where("slug", "==", slug));
        const querySnapshot = await getDocs(slugQuery); // Use getDocs for querying

        if (querySnapshot.empty) {
            return NextResponse.json({ error: "Tour not found" }, { status: 404 });
        }

        // Retrieve the first matching document
        const tourDoc = querySnapshot.docs[0];
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
