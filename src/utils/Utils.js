import { firestore } from "@/firebase/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

function generateCouponCode() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = Array.from({ length: 2 }, () =>
        alphabets.charAt(Math.floor(Math.random() * alphabets.length))
    ).join("");

    const numbers = [];
    while (numbers.length < 4) {
        const randomNumber = Math.floor(Math.random() * 10);
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }
    const numeric = numbers.join("");
    return letters + numeric;
}

// Function to check if a coupon code is unique
async function isCodeUnique(couponCode) {
    const docRef = doc(firestore, "coupon-code", "gvcGadAU19WWCSBSvCiU");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().codes) {
        return !docSnap.data().codes.includes(couponCode); // Return true if the code is not in the array
    }
    return true; // If the document or field doesn't exist, the code is unique
}

export async function generateAndStoreCouponCode() {
    let couponCode;

    try {
        do {
            couponCode = generateCouponCode();
        } while (!(await isCodeUnique(couponCode))); // Regenerate until unique

        const docRef = doc(firestore, "coupon-code", "gvcGadAU19WWCSBSvCiU");
        await updateDoc(docRef, {
            codes: arrayUnion(couponCode),
        });

        return couponCode;
    } catch (error) {
        console.error("Error generating or storing coupon code:", error);
        throw error;
    }
}
