import BookingFrom from "./BookingFrom";
import { Suspense } from "react";

export default async function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BookingFrom />
        </Suspense>
    );
}