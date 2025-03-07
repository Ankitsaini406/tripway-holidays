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

            const isLogin = additionalData.role === 'Driver' ? false : true;
            await putData(`${dataBaseName}/${additionalData.countryCode + additionalData.phoneNumber}`, {
                uid: additionalData.countryCode + additionalData.phoneNumber,
                email: user.email,
                password: password,
                isLogin,
                ...additionalData
            });

            isLogin ? router.push('/auth/client-login') : router.push('/auth/driver/login');
            return user;
        } catch (error) {
            console.log("Error signing up:", error);
            throw error;
        }
    };

    const createNewUser = async (additionalData, dataBaseName) => {
        try {

            const isLogin = additionalData.role === 'Driver' ? false : true;
            const user = await putData(`${dataBaseName}/${additionalData.countryCode + additionalData.phoneNumber}`, {
                uid: additionalData.countryCode + additionalData.phoneNumber,
                email: additionalData.email,
                password: password,
                isLogin,
                ...additionalData
            });

            const idToken = await user.getIdToken();
            setCookie('token', idToken, { secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', expires: expires });

            setUser({
                uid: user.uid,
                email: user.email,
            });

            isLogin ? router.push('/auth/client-login') : router.push('/auth/driver/login');
            return user;
        } catch (error) {
            console.log("Error signing up:", error);
            throw error;
        }
    };

    const putData = (key, data) => set(ref(database, key), data);

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

    const checkEmailExists = async (email, collection) => {
        const dbRef = ref(database);
        const emailQuery = query(
            child(dbRef, collection),
            orderByChild("email"),
            equalTo(email)
        );

        const emailSnapshot = await get(emailQuery);

        if (!emailSnapshot.exists()) {
            return null; // No account found
        }

        // Get the first matched user data
        const userData = Object.values(emailSnapshot.val())[0];
        return userData;
    };

    const loginUser = async (email, password) => {
        try {
            const userData = await checkEmailExists(email, `users`);

            if (!userData) {
                throw new Error("No account found with this email.");
            }

            // Check if the user is authenticated (isLogin: true)
            if (!userData.isLogin) {
                throw new Error("You are not an authenticated user.");
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;

            setUser({
                uid: loggedInUser.uid,
                email: loggedInUser.email,
            });

            const idToken = await loggedInUser.getIdToken();
            setCookie('token', idToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                expires: expires
            });

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
