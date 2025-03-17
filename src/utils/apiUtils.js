import { toast } from "react-toastify";

export const sendWhatsAppMessage = async (requestBody) => {
    try {
        const res = await fetch("/api/phone/whats-app-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to send message");

        console.log("WhatsApp Response:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        return { success: false, error: error.message };
    }
};

const loadRazorpay = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// Function to initiate Razorpay payment
export const initiateRazorpayPayment = async ({ amount, formData, onSuccess }) => {
    try {
        const res = await loadRazorpay();
        if (!res) {
            toast.error("Razorpay SDK failed to load.");
            return;
        }

        const api = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

        // 🔹 1. Create an order in the backend
        const response = await fetch(`${api}api/razorpay/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: amount * 100,
                name: formData.name,
                email: formData.email,
                contact: `${formData.countryCode}${formData.phoneNumber}`
            }),
        });

        const data = await response.json();
        if (!data.order) {
            toast.error("Failed to create order!");
            return;
        }

        // 🔹 2. Configure Razorpay options
        const options = {
            key: process.env.RAZORPAY_LIVE_ID,
            order_id: data.order.id,
            amount: amount * 100,
            currency: "INR",
            name: "Tripway Holidays",
            description: "Booking Payment",
            image: "https://tripwayholidays.in/favicon-512.png",
            handler: async function (response) {
                console.log("Payment Success:", response);

                // 🔹 3. Verify the payment
                const res = await fetch(`${api}api/razorpay/verify-order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }),
                });

                const result = await res.json();
                if (result.isOk) {
                    toast.success("Payment Verified!");
                    onSuccess(response.razorpay_payment_id);
                } else {
                    toast.error("Payment Verification Failed!");
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: `${formData.countryCode}${formData.phoneNumber}`
            },
            theme: { color: `#3F51B5` }
        };

        // 🔹 4. Open Razorpay payment window
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();

        razorpayInstance.on("payment.failed", function (response) {
            console.error("Payment Failed:", response);
            toast.error("Payment failed. Please try again.");
        });

    } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "An error occurred. Please try again.");
    }
};
