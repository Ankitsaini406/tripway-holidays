import { headers } from "next/headers";
import SelectCars from "./SelectCars";
import { getDistance } from "@/app/action/getDistance";

export default async function Page() {
    // Await headers()
    const headersList = await headers();
    const from = headersList.get("x-from") || "";
    const to = headersList.get("x-to") || "";

    // Fetch distance on the server
    const distance = from && to ? await getDistance(from, to) : null;

    return <SelectCars initialDistance={distance} />;
}
