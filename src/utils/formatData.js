import { Timestamp } from 'firebase/firestore';

export const formatTimestamp = (timestamp) => {
    if (timestamp instanceof Timestamp) {
        return formatDate(timestamp.toDate());
    }
    return formatDate(new Date(timestamp));
};

export const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
};

export const formatDate2 = (date) => {
    if (!date) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatTime = (time) => {
    if (!time) return "N/A";

    const [hour, minute] = time.split(":").map(Number);
    let ampm = hour >= 12 ? "PM" : "AM";
    let adjustedHour = hour % 12 || 12;
    return `${String(adjustedHour).padStart(2, "0")}:${minute} ${ampm}`;
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(price);
};

export const truncateDescription = (description, maxLength = 100) => {
    if (!description) return "";
    return description.length > maxLength
        ? `${description.slice(0, maxLength)}...`
        : description;
};
