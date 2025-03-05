"use client";

import { useState } from "react";
import { ContactDetails } from "@/utils/Utils";
import styles from "@/styles/pages/selectCabs.module.css";

export default function BookingFrom() {

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
    });

        const aisensy = process.env.AI_SENSY;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const sendMessage = async () => {
        if (!formData.name || !formData.phoneNumber) {
            toast.error("Please fill in all details before proceeding.");
            return;
        }

        const campaign = title === "one-way"
            ? "websiteonewaybooking"
            : title === "round-trip"
                ? "websiteroundtripbooking"
                : "websitemulticitybooking";

        const url = title === "one-way"
            ? "https://www.theglobeandmail.com/resizer/v2/BYBSVGDHZZAFZP7LTGXMHPXZ3Q?auth=ccda29f1d41119ef2fc927c805845397675c96ae83717fa4801a3fdc09f016f1&width=300&height=200&quality=80&smart=true"
            : title === "round-trip"
                ? "https://tripwayholidays.in/cab/round-trip-whatsapp.png"
                : "https://www.aisensy.com/multi-city-booking";

        const fileName = title === "one-way"
            ? "PNG"
            : title === "round-trip"
                ? "PNG"
                : "multi-city.png";

        const requestBody = {
            apiKey: aisensy,
            campaignName: campaign,
            destination: "+91" + formData.phoneNumber,
            userName: formData.name,
            templateParams: [formData.name, from, to, `${startDate} ${time}`, selectedCar.name, "500"],
            media: {
                url: url,
                filename: fileName
            }
        };

        try {
            const res = await fetch("/api/book-cab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Failed to send message:", data);
                throw new Error(data.error || "Failed to send message");
            }

            console.log("WhatsApp Response:", data);
            toast.success("Message sent successfully!");
            setShowPopUp(false);
            setFormData({ name: "", phoneNumber: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error sending message. Try again.");
        }
    };

    return (
        <div>
            <label htmlFor="nameInput">Name</label>
            <ContactDetails
                name="name"
                placeholder="Enter Your Name"
                type="text"
                value={formData.name}
                handleChange={handleChange}
                className={styles.searchInput}
                id="nameInput"
            />

            <label htmlFor="phoneInput">Phone Number</label>
            <ContactDetails
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                type="number"
                value={formData.phoneNumber}
                handleChange={handleChange}
                className={styles.searchInput}
                id="phoneInput"
            />
        </div>
    );
}