import { firestore } from "@/firebase/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
const apiKey = process.env.AI_SENSY;
export const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

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

export const generateToken = async (uid) => {
    try {
        const response = await fetch(`${apiPoint}api/generate-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate token.");
        }

        const { token } = await response.json();
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        return null;
    }
};

export const sendOtp = async ({ campaignName, phoneNumber, otp }) => {

    console.log(`This is data : `, campaignName, phoneNumber, otp);

    const requestBody = {
        apiKey,
        campaignName: campaignName,
        destination: phoneNumber,
        userName: 'user',
        templateParams: [otp],
        buttons: [
            {
                type: "button",
                sub_type: "url",
                index: 0,
                parameters: [{ type: "text", text: otp }],
            },
        ],
    };

    try {
        const res = await fetch("/api/phone/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Failed to send message:", data);
            throw new Error(data.error || "Failed to send message");
        }

        console.log("WhatsApp Response:", data);
        toast.success("🎉 OTP sent successfully! Check your WhatsApp 📲");
    } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Error sending OTP. Try again.");
    }
};

export function ContactDetails({ type, name, value, handleChange, className, placeholder }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={className}
            placeholder={placeholder}
        />
    );
}
