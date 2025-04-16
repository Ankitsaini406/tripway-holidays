import { Suspense } from "react";
import BookingSuccessContent from "./BookingComponent";

export default async function Page() {
    return (
        <Suspense fallback={<div>Loading booking details...</div>}>
            <BookingSuccessContent />
        </Suspense>
    );
}

