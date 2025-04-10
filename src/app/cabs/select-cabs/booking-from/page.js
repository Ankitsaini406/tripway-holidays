import BookingFrom from "./BookingFrom";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/Utils";

export default async function Page() {

        const cookieStore = await cookies();
        const bookingID = cookieStore.get("bookingToken")?.value || "";
    
        const data = decodeToken(bookingID);

    return <BookingFrom bookingData={data.body} />
}