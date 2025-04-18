import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        // Destructure fields from body
        const {
            name,
            countryCode,
            phoneNumber,
            email,
            pickupPoint,
            dropPoint,
            startDate,
            time,
            selectedCar,
            title,
            paymentType,
            amount,
            total,
            nightCharge,
            gstAmount,
            from,
            to,
            distance,
            offerFrom,
        } = body;

        // Validate required fields (updated logic here)
        const requiredFields = {
            name,
            countryCode,
            phoneNumber,
            email,
            pickupPoint,
            dropPoint,
            startDate,
            time,
            selectedCar,
            title,
            paymentType,
            amount,
            total,
            nightCharge,
            gstAmount,
            from,
            to,
            distance,
        };

        const missingFields = [];
        for (const [key, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value === "") {
                missingFields.push(key);
            }
        }

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(", ")}` },
                { status: 400 }
            );
        }

        // Google Sheets auth
        const auth = await google.auth.getClient({
            credentials: {
                type: "service_account",
                project_id: process.env.GOOGLE_PROJECT_ID,
                private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Append to Google Sheet
        const fullNumber = `${countryCode}${phoneNumber}`;

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "OneWay!A1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [
                        name,
                        fullNumber,
                        email,
                        title,
                        from,
                        to,
                        pickupPoint,
                        dropPoint,
                        startDate,
                        time,
                        paymentType,
                        amount,
                        gstAmount,
                        nightCharge,
                        total,
                        selectedCar,
                        distance,
                        offerFrom,
                    ],
                ],
            },
        });

        return NextResponse.json(
            { success: true, updatedRange: response.data.updates.updatedRange },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error writing to Google Sheet:", error);
        const errorMessage = error?.response?.data?.error?.message || "Internal Server Error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
