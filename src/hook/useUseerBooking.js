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

    // Fetch user data from Firebase (check both 'users' and 'agents' tables)
    useEffect(() => {
        if (!user?.uid) return;

        const fetchUserData = async () => {
            setLoadingUser(true);
            try {
                // First check the 'users' table
                let userRef = ref(database, `users/${user.uid}`);
                let snapshot = await get(userRef);

                if (snapshot.exists()) {
                    setUserData({ ...snapshot.val(), from: 'users' });
                    return;
                }

                // If not found in 'users', check the 'agents' table
                userRef = ref(database, `agents/${user.uid}`);
                snapshot = await get(userRef);

                if (snapshot.exists()) {
                    setUserData({ ...snapshot.val(), from: 'agents' });
                    return;
                }

                console.log(snapshot.val())
                setError('User or agent data not found.');
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data.');
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUserData();
    }, [user?.uid]);

    // Fetch user bookings from Firebase once userData is available
    useEffect(() => {
        if (!userData) return;

        const fetchUserBookings = async () => {
            setLoadingBookings(true);
            try {
                let toursRef = ref(database, `users/${user.uid}/tours`);
                let toursSnapshot = await get(toursRef);

                if (!toursSnapshot.exists()) {
                    setBookings([]);
                    return;
                }

                toursRef = ref(database, `agents/${user.uid}/tours`);
                toursSnapshot = await get(toursRef);

                if (!toursSnapshot.exists()) {
                    setBookings([]);
                    return;
                }

                const tourIds = Object.keys(toursSnapshot.val());
                const allBookings = await fetchBookings(tourIds);
                setBookings(allBookings);
            } catch (err) {
                setError('Error fetching bookings.');
                console.error(err);
            } finally {
                setLoadingBookings(false);
            }
        };

        fetchUserBookings();
    }, [userData]);

    // Fetch bookings for the given tour IDs
    const fetchBookings = async (tourIds) => {
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
