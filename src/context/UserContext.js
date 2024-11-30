'use client';

import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { set, ref, get, child, query, equalTo, orderByChild } from "firebase/database";
import { setCookie, getCookie, removeCookie } from 'cookies-next';

const UserContext = createContext(null);

export const useClient = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Load user from cookie on initial load (client-side)
    useEffect(() => {
        const savedUser = getCookie('token');
        if (savedUser) {
            setUser(savedUser); // Set user from cookie if it exists
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
            setCookie('token', idToken, { secure: true, httpOnly: true, sameSite: 'Strict', expires: expires });

            await updateProfile(user, {
                displayName: additionalData.name,
                phoneNumber: additionalData.phoneNumber,
            });

            await putData(`${dataBaseName}/${user.uid}`, {
                uid: user.uid,
                email: user.email,
                password: password,
                ...additionalData
            });

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

            const idToken = await user.getIdToken();
            setCookie('token', idToken, { secure: true, httpOnly: true, sameSite: 'Strict', expires: expires });

            await updateProfile(newUser, {
                displayName: additionalData.name,
            });

            await putData(`${dataBaseName}/${newUser.uid}`, {
                uid: newUser.uid,
                email: newUser.email,
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

    const loginUser = async (email, password, url) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const isEmail = await checkEmailExists(email, `${url}`);

            if (!isEmail) {
                throw new Error("No account found with this email.");
            }

            const loggedInUser = userCredential.user;
            setUser({
                uid: loggedInUser.uid,
                email: loggedInUser.email,
            });

            const idToken = await user.getIdToken();
            setCookie('token', idToken, { secure: true, httpOnly: true, sameSite: 'Strict', expires: expires });

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

            // Remove user data from cookie using cookies-next
            removeCookie('token');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, signupUserWithEmailAndPassword, createNewUser, putData, loginUser, checkEmailExists, logoutUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
