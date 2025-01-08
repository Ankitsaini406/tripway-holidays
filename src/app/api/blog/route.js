import { firestore } from "@/firebase/firebaseConfig";
import { NextResponse } from "next/server";
import { getDocs, collection, Timestamp } from "firebase/firestore";

export async function GET() {
    try {
        const tourCollectionRef = collection(firestore, "blog");
        const querySnapShot = await getDocs(tourCollectionRef);

        const blogs = querySnapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Assuming the 'date' field is a Firestore Timestamp, sort the blogs by date (ascending)
        const sortedBlogs = blogs.sort((a, b) => {
            const dateA = a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date);
            const dateB = b.date instanceof Timestamp ? b.date.toDate() : new Date(b.date);
            return dateB - dateA; // Sort in ascending order
        });

        return NextResponse.json(sortedBlogs, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs: ", error);
        return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
    }
}
