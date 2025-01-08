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
        const blogCollection = collection(firestore, "blog");
        const slugQuery = query(blogCollection, where("slug", "==", slug));
        const querySnapshot = await getDocs(slugQuery); // Use getDocs for querying

        if (querySnapshot.empty) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Retrieve the first matching document
        const BlogDoc = querySnapshot.docs[0];
        const blog = {
            id: BlogDoc.id,
            ...BlogDoc.data(),
        };

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog: ", error);
        return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
    }
}
