import { firestore, database } from "@/firebase/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, get, set } from "firebase/database";
import { toast } from "react-toastify";
import { sendWhatsAppMessage } from "./apiUtils";

const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;
const apiKey = process.env.AI_SENSY;
export const generateOtp = () => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

function generateCouponCode(role) {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let firstLetter;

    if (role === "User") {
        firstLetter = "U";
    } else if (role === "Agent") {
        firstLetter = "A";
    } else {
        return Array.from({ length: 6 }, () =>
            (alphabets + "0123456789").charAt(Math.floor(Math.random() * (alphabets.length + 10)))
        ).join("");
    }

    const randomLetter = alphabets.charAt(Math.floor(Math.random() * alphabets.length));

    const numbers = new Set();
    while (numbers.size < 4) {
        numbers.add(Math.floor(Math.random() * 10));
    }

    const numeric = [...numbers].join("");
    return firstLetter + randomLetter + numeric;
}

async function isCodeUnique(couponCode) {
    try {
        const docRef = doc(firestore, "coupon-code", "gvcGadAU19WWCSBSvCiU");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().codes) {
            return !docSnap.data().codes.includes(couponCode);
        }
        return true;
    } catch (error) {
        console.error("Error checking coupon uniqueness:", error);
        throw error;
    }
}

export async function generateAndStoreCouponCode(role) {
    let couponCode;

    try {
        do {
            couponCode = generateCouponCode(role);
        } while (!(await isCodeUnique(couponCode)));

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

export const checkUserExistence = async (phoneNumber, userData) => {
    const userRef = ref(database, `users/${phoneNumber}`);

    try {
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            toast.success("User data found.");

        } else {
            await set(userRef, {
                name: userData.name,
                phoneNumber: phoneNumber,
                email: userData.email,
            });
            toast.success("User data saved successfully!");
        }
    } catch (error) {
        console.error("Error checking user:", error);
        toast.error("Error fetching user details.");
    }
};


export const generateAgentCode = (data) => {
    const chars = `${data.name}${data.phoneNumber}`;
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `TRIP${code.toUpperCase()}`;
};

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
        const response = await sendWhatsAppMessage(requestBody);
        if (!response.success) {
            throw new Error(response.error);
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
