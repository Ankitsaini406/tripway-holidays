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