import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { database, firestore } from '@/firebase/firebaseConfig';

const useUserBookings = (user) => {
    const [userData, setUserData] = useState(null);
    const [agentBookings, setAgentBookings] = useState([]); // Separate state for agent bookings
    const [userBookings, setUserBookings] = useState([]); // Separate state for user bookings
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [error, setError] = useState('');

    // Fetch user data on component mount or when the user changes
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

    // Fetch bookings once userData is available
    useEffect(() => {
        if (!userData) return; // Wait until userData is available

        const fetchBookings = async () => {
            setLoadingBookings(true); // Set loading for bookings
            try {
                // Define paths for agent tours and user tours
                const agentToursPath = `users/${userData.uid}/agentTours`;
                const userToursPath = `users/${user.uid}/tours`;

                // Fetch both agent and user tours concurrently
                const [agentToursSnapshot, userToursSnapshot] = await Promise.all([
                    get(ref(database, agentToursPath)),
                    get(ref(database, userToursPath)),
                ]);

                // Fetch booking details for agent tours
                if (agentToursSnapshot.exists()) {
                    const agentTourIds = Object.keys(agentToursSnapshot.val());
                    const agentBookingsData = await fetchBookingsData(agentTourIds);
                    setAgentBookings(agentBookingsData); // Update state for agent bookings
                } else {
                    setAgentBookings([]); // No agent bookings found
                }

                // Fetch booking details for user tours
                if (userToursSnapshot.exists()) {
                    const userTourIds = Object.keys(userToursSnapshot.val());
                    const userBookingsData = await fetchBookingsData(userTourIds);
                    setUserBookings(userBookingsData); // Update state for user bookings
                } else {
                    setUserBookings([]); // No user bookings found
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Error fetching bookings.');
            } finally {
                setLoadingBookings(false); // Set loadingBookings to false after fetching
            }
        };

        fetchBookings();
    }, [userData]);

    // Fetch booking details from Firestore
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
        agentBookings, // Separate state for agent bookings
        userBookings, // Separate state for user bookings
        loadingUser,
        loadingBookings,
        error,
    };
};

export default useUserBookings;
