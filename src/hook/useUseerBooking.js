import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { database, firestore } from '@/firebase/firebaseConfig';

const useUserBookings = (user) => {
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.uid) return;

        const fetchData = async () => {
            setLoadingUser(true); // Set loading for user data
            try {
                // Fetch user data from 'users' table
                let userRef = ref(database, `users/${user.uid}`);
                let snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = { ...snapshot.val(), from: 'users' };
                    setUserData(userData);
                    setLoadingUser(false); // Set loadingUser to false once user data is fetched
                } else {
                    setError('User or agent data not found.');
                    setLoadingUser(false); // Set loadingUser to false if there's an error
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
                setLoadingUser(false); // Set loadingUser to false on error
            }
        };

        fetchData();
    }, [user?.uid]);

    useEffect(() => {
        if (!userData) return; // Wait until userData is available

        const fetchBookings = async () => {
            setLoadingBookings(true); // Set loading for bookings
            try {
                let toursRef = ref(database, `users/${user.uid}/tours`);
                let toursSnapshot = await get(toursRef);

                if (!toursSnapshot.exists()) {
                    setBookings([]);
                    setLoadingBookings(false); // Set loadingBookings to false if no tours
                    return;
                }

                const tourIds = Object.keys(toursSnapshot.val());
                const allBookings = await fetchBookingsData(tourIds);
                setBookings(allBookings);
                setLoadingBookings(false); // Set loadingBookings to false after bookings are fetched
            } catch (err) {
                setError('Error fetching bookings.');
                setLoadingBookings(false); // Set loadingBookings to false on error
                console.error('Error fetching bookings:', err);
            }
        };

        fetchBookings();
    }, [userData]); // Trigger fetching bookings once userData is available

    const fetchBookingsData = async (tourIds) => {
        const bookingPromises = tourIds.flatMap((tourId) => [
            getDoc(doc(firestore, 'user-tours', tourId)),
            getDoc(doc(firestore, 'one-way', tourId)),
            getDoc(doc(firestore, 'round-trip', tourId)),
            getDoc(doc(firestore, 'multi-city', tourId)),
        ]);

        const snapshots = await Promise.all(bookingPromises);

        const allBookings = snapshots
            .filter((snapshot) => snapshot.exists())
            .map((snapshot) => ({ id: snapshot.id, ...snapshot.data() }));

        return allBookings.sort((a, b) => {
            const dateA = new Date(a.startDate?.toDate ? a.startDate.toDate() : a.startDate);
            const dateB = new Date(b.startDate?.toDate ? b.startDate.toDate() : b.startDate);
            return dateB - dateA; // Descending order
        });
    };

    return {
        userData,
        bookings,
        loadingUser,
        loadingBookings,
        error,
    };
};

export default useUserBookings;
