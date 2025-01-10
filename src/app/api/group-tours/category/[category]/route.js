import { collection, getDocs, query, where } from "firebase/firestore";
import { isBefore, parse } from "date-fns";
import { firestore } from "@/firebase/firebaseConfig";

export async function GET(req, { params }) {
    try {
        const { category } = await params;

        if (!category) {
            return new Response("Category is required.", { status: 400 });
        }

        // Fetch data from Firestore based on the category
        const categoryCollectionRef = collection(firestore, "group-tours");
        const q = query(categoryCollectionRef, where("category", "==", category));
        const querySnapshot = await getDocs(q);

        // Extract tour data from the query snapshot
        const tours = [];
        querySnapshot.forEach((doc) => {
            tours.push(doc.data());
        });

        if (!tours.length) {
            return new Response("No tours found for this category.", { status: 404 });
        }

        // Sort the tours by the startDate (ascending order)
        tours.sort((a, b) => {
            const dateA = parse(a.startDate, "dd-MMM-yyyy", new Date());
            const dateB = parse(b.startDate, "dd-MMM-yyyy", new Date());
            return dateA - dateB; // Ascending order (earliest date first)
        });

        const currentDate = new Date();
        let selectedTour = null;

        // Find the first upcoming tour (if any)
        for (let tour of tours) {
            const tourStartDate = parse(tour.startDate, "dd-MMM-yyyy", new Date());
            if (isBefore(currentDate, tourStartDate)) {
                selectedTour = tour; // Show the first upcoming tour
                break;
            }
        }

        // If no upcoming tour, show the latest past tour
        if (!selectedTour) {
            selectedTour = tours[tours.length - 1]; // Last tour in the sorted list
        }

        // Return the selected tour data
        return new Response(JSON.stringify(selectedTour), { status: 200 });
    } catch (error) {
        console.error("Error fetching tours:", error);
        return new Response("Failed to fetch tours.", { status: 500 });
    }
}
