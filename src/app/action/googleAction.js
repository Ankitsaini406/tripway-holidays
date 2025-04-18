import { google } from "googleapis";

export async function getDistance(from, to) {
    if (!from || !to) return null;

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

    try {
        const res = await fetch(`${apiPoint}/api/google/distance?origin=${from}&destination=${to}`, {
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch distance");

        const data = await res.json();

        // Extract distance text
        const distText = data?.rows?.[0]?.elements?.[0]?.distance?.text;
        if (!distText) throw new Error("Distance not found in API response");

        // Convert distance to numeric value
        let distValue = parseFloat(distText.replace(/[^\d.]/g, ""));

        // Check if the distance is in miles and convert to km
        if (distText.includes("mi")) {
            distValue = (distValue * 1.60934).toFixed(2);
        } else {
            distValue = distText; // Already in km
        }

        return distValue;
    } catch (error) {
        console.error("Error fetching distance:", error);
        return null;
    }
}

function convertToPipeSeparated(destination) {
    const decodedDestination = decodeURIComponent(destination);
    const formattedDestination = decodedDestination.replace(/,/g, "|");
    return formattedDestination;
}

export async function getTotalDistance(places) {
    if (!places || places.length < 2) {
        console.error("At least two places are required.");
        return null;
    }

    const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
    let totalDistance = 0;

    try {

        for (let i = 0; i < places.length - 1; i++) {
            // Ensure each location is properly encoded
            const from = encodeURIComponent(places[i]);
            const to = encodeURIComponent(places[i + 1]);

            const tos = convertToPipeSeparated(to);

            const res = await fetch(`${apiPoint}/api/google/distances?origin=${from}&destination=${tos}`, {
                cache: "no-store",
            });

            if (!res.ok) throw new Error(`Failed to fetch distance from ${places[i]} to ${places[i + 1]}`);

            const data = await res.json();

            let totalDistanceInMeters = 0;
            data.rows[0].elements.forEach((element) => {
                totalDistanceInMeters += element.distance.value;
            });

            let totalDistanceInKilometers = totalDistanceInMeters / 1000;
            totalDistance += totalDistanceInKilometers;
        }
        return `${totalDistance.toFixed(2)}`;

    } catch (error) {
        console.error("Error calculating total distance:", error);
        return null;
    }
}

export async function postSheetData() {
    const glAuth = await google.auth.getClient({
        projectId: 'tripway-holidays-452211',
        credentials: {
            "type": "service_account",
            "project_id": "tripway-holidays-452211",
            "private_key_id": "52a973a37cc356d827f903cd6417250e82896cc2",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDLLs43l0ihLngq\nAEyqQ46l6duPjgXHzVuOfIqPqNfRjnBgSwwxZs6pOPqsnUWh2BLF+ubMHJ8s+8EC\nwdFak5Bgj7mFClGkNceyooQ6nPzImtu8UpWP8oqLm40ecfPDn4CBvg+aomRzTjSI\n7G17vQnrjhGCS6gG2lya9+rzIR2OfdCzOwvxJVavzX68VowLv5h/gckFgzJu0ujP\nVQCMu+7Gd/TVf2RZobTsiGxc5OiV0YJUEkNaUFUp2Gn8Wf1BQKb19YUUvVAUlxB5\nplvEEfG61mJgeDrqV/ZUeAwOCGh9Kwn40yr7H67iI06lodqp4Xg6rJPuW/yEgtQ8\nBqrSn5RZAgMBAAECggEAEsOxVs/5bK1SeqqJagYQNAFrfhADN6cfCAM3droEqH1L\nopD7wMo6VsWE3REvP5mpbjBURVB1YN2lPyBwObm8ETbkzsUbshsnZLd+l70s2Uf3\n+CX2WxNuuSL1/vROK2hdIV5QqZrKxR1ZW7XeDJnyQxddRZfAHlXnTIaN48NQq/qH\ncoqI5prTu7xnFjGyOc7BqEUVack1lgkjOHzGqQf7iBj9H4GiYI7CP+6lzzRK21F1\nYs7cF2TDUZdcD7ruPcuApysPvaPfevRUC4gT2DAn3L7HQBOarepetM77ZSa9kyZY\nnVwjM374LJVPnvIUv8Z3SKk3BGQRGKa7rPn8uA4xqwKBgQDuz+Lpkd3bAhhulXjB\np800QcHZErV+R8ZCA26Kew/0ZeiAg/3qLi/X1hUQ5G8TWk7HMpTj/1m+2zmQYdFA\nPRtfVzk/UPyUD3tK9He3RA8MGrjfUcAtLUyKGXDMyATD97Rwaurewm8mhQ+dZRj+\nCuLh8sD72Gr3M/GQXc21pUtlJwKBgQDZznNVWtQVce+8ZogqIOhTk0NjJg/RlKFg\naOJUv1tLb2fVlF2ixCwE3AsbcJa8sh45xtEPfRpMMEPigNbcfxdooBRxjeIkxlPL\nG/xFyWrBCwj6Jk4yF24oslFdAJmNpL60TFZJkn/HV0htdgKVRdhpcPKxP2jjyRPc\n854fc2AqfwKBgFOr/sL7WpILb+f+8upXEqzGhVa7GV//YdVrQmW+rF5i/k1Y8bQF\nLroexg6/GrPbJlLgxA4GP7mBMfAGdbxeLKMA+ovWokh2DCq88N0DOYpyKmgESqMJ\nhhG0zDLTuee3eD8TFuupkCwc3tW0wEbyJYAo/7i9oOywBGkilJqaKYptAoGAdykz\nAjyqEX1/SpTR5DKSyL6lvIXjW6c0Tvmy8eirOu8dYMVGITmwV4xHa2DCp0PPs45p\nbE7mZ050pWQVqRbDKNODu8iDM9lpmJKcB1Y12J1/8NOqLk+RTiSYzQf5+ntqdlvZ\nTXEgBWBkWLaanS5UQwOvU3e8m/qzqkuCc/R8ZWMCgYBtf6pvJ8CeLz5lCOWAjDSg\ncFVaHMFnIxBvWXI7Jp/YhJuxyR7usMIuUL1sD+pOym0V4/sOFvwJRlX2vESkvBSu\nwLukMKmWEEOz9o4BeBpHRJZW0iQ2J4AYoJIOFW13rBnOuMFoqGjdB1UVPBPlPDd5\nO7T82yMU2ifp41MmNwoixg==\n-----END PRIVATE KEY-----\n",
            "client_email": "tripway-service@tripway-holidays-452211.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com" 
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: "1uvAqzMsbLaQWRNOdBuldwrv4cYJiRMO8YdniLdPYrs8",
        range: "One Way!A1",
    });

    return { data: data.data.values };
}
