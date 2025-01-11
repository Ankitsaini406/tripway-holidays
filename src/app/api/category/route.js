import { NextResponse } from "next/server";
import { firestore } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


export async function GET () {

    try {
        const categoryCollectionRef = collection(firestore, "category");
        const querySnapShot = await getDocs(categoryCollectionRef);

        const categories = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories", error);
        return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
    }
}