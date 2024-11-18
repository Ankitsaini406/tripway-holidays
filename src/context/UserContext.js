'use client';

import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { set, ref, get, child, query, equalTo, orderByChild } from "firebase/database";

const UserContext = createContext(null);

export const useClient = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
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
    
            // You can store additional data in the database without changing the current user state
            await putData(`${dataBaseName}/${newUser.uid}`, { 
                uid: newUser.uid,
                email: newUser.email,
                ...additionalData
            });
    
            return { uid: newUser.uid, email: newUser.email, ...additionalData };
        } catch (error) {
            console.log("Error creating new user:", error);
            throw error; // Handle the error appropriately
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

    const loginUser = async (email, password) => {
        try {
            // Attempt to sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
            // Check in both agents and users collections
            const isAgent = await checkEmailExists(email, 'agents');
            const isUser = await checkEmailExists(email, 'users');
    
            if (!isAgent && !isUser) {
                throw new Error("No account found with this email.");
            }
    
            return { user: userCredential.user};
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
