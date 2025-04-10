import { cookies } from "next/headers";
import SelectCars from "./SelectCars";
import { decodeToken } from "@/utils/Utils";
// import { getDistance, getTotalDistance } from "@/app/action/getDistance";

export default async function Page() {
    const cookieStore = await cookies();
    const bookingID = cookieStore.get("bookingToken")?.value || "";

    const data = decodeToken(bookingID);

    // let place = [];

    // if (data.body.title === 'multi-city') {
    //     place = [data.body.from, data.body.to];
    // }

    // const distance = data.body.title === 'multi-city' 
    //     ? await getTotalDistance(place) 
    //     : await getDistance(data.body.from, data.body.to);

    return <SelectCars bookingData={data.body} />;
}
