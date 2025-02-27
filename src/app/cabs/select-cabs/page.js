import { Suspense } from "react";
import SelectCars from "./SelectCars";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SelectCars />
        </Suspense>
    );
}
