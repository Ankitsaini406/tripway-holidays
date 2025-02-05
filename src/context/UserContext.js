'use client';

import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { set, ref, get, child, query, equalTo, orderByChild } from "firebase/database";
import { jwtDecode } from 'jwt-decode';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserContext = createContext(null);

export const useClient = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Load user from cookie on initial load (client-side)
    useEffect(() => {
        const savedToken = getCookie('token');
        if (savedToken) {
            try {
                const decodedToken = jwtDecode(savedToken);
                setUser(decodedToken);
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Auth state changed:", currentUser);
        });

        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = async (email, password, additionalData, dataBaseName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            setUser({
                uid: user.uid,
                email: user.email,
            });

            const idToken = await user.getIdToken();
            setCookie('token', idToken, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', expires: expires });

            await updateProfile(user, {
                displayName: additionalData.name,
                phoneNumber: additionalData.phoneNumber,
            });

            await putData(`${dataBaseName}/${user.uid}`, {
                uid: user.uid,
                email: user.email,
                password: password,
                role: 'User',
                ...additionalData
            });

            router.push('/auth/client-login');
            return user;
        } catch (error) {
            console.log("Error signing up:", error);
            throw error;
        }
    };

    const createNewUser = async (email, password, additionalData, dataBaseName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            const idToken = await newUser.getIdToken();
            setCookie('token', idToken, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', expires: expires });

            await updateProfile(newUser, {
                displayName: additionalData.name,
            });

            await putData(`${dataBaseName}/${newUser.uid}`, {
                uid: newUser.uid,
                email: newUser.email,
                role: 'User',
                ...additionalData
            });

            return { uid: newUser.uid, email: newUser.email, ...additionalData };
        } catch (error) {
            console.log("Error creating new user:", error);
            throw error;
        }
    };

    const putData = (key, data) => set(ref(database, key), data);

    const checkEmailExists = async (email, collection) => {
        const dbRef = ref(database);
        const emailQuery = query(
            child(dbRef, collection),
            orderByChild("email"),
            equalTo(email)
        );

        const emailSnapshot = await get(emailQuery);
        return emailSnapshot.exists(); // Return true if the email exists
    };

    const verificationEmail = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser && !currentUser.emailVerified) {
                await sendEmailVerification(currentUser);
                toast("Verification email resent. Please check your inbox.");
            } else {
                throw new Error("User is already verified or not logged in.");
            }
        } catch (error) {
            console.error("Error resending verification email:", error);
            toast.error("Could not resend verification email.");
        }
    };

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const isEmail = await checkEmailExists(email, `users`);

            if (!isEmail) {
                throw new Error("No account found with this email.");
            }

            const loggedInUser = userCredential.user;
            setUser({
                uid: loggedInUser.uid,
                email: loggedInUser.email,
            });

            const idToken = await loggedInUser.getIdToken();
            setCookie('token', idToken, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', expires: expires });

            return { user: loggedInUser };
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    // Sign out function
    const logoutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            deleteCookie('token', { path: '/', domain: window.location.hostname });
            router.push('/auth/client-login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, signupUserWithEmailAndPassword, createNewUser, verificationEmail, loginUser, logoutUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
