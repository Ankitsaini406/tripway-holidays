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
