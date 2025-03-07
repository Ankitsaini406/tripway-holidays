'use client';

import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { set, ref, get, child, query, equalTo, orderByChild } from "firebase/database";
import { jwtDecode } from 'jwt-decode';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import { generateToken } from "@/utils/Utils";

const UserContext = createContext(null);

export const useClient = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const jwtKey = process.env.JWT_SECRET_KEY;

    // Load user from cookie on initial load (client-side)
    useEffect(() => {
        const savedToken = getCookie('token');
        if (savedToken) {
            try {
                if (savedToken.split('.').length === 3) { // JWT should have 3 parts
                    const decodedToken = jwtDecode(savedToken);
                    setUser(decodedToken);
                } else {
                    console.error("Invalid token format:", savedToken);
                    deleteCookie('token'); // Remove the invalid token
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                deleteCookie('token'); // Remove corrupted token
            }
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Auth state changed:", currentUser);
        });

        return () => unsubscribe();
    }, []);


    const createNewUser = async (additionalData) => {
        try {
            if (!additionalData.phoneNumber || !additionalData.countryCode) {
                throw new Error("Phone number or country code is missing.");
            }
    
            const userId = additionalData.countryCode + additionalData.phoneNumber;
            const existingUser = await checkUserExists(userId, `users`);
    
            if (existingUser) {
                console.log("User already exists:", existingUser);
                toast.info("User already exists. Please login.");
                existingUser.isLogin ? router.push('/auth/client-login') : router.push('/auth/driver/login');
                return existingUser;
            }
    
            const isLogin = additionalData.role === 'Driver' ? false : true;
            const email = additionalData.email;
    
            const userData = {
                uid: userId,
                email,
                isLogin,
                ...additionalData, 
            };

            Object.keys(userData).forEach(key => {
                if (userData[key] === undefined) {
                    delete userData[key];
                }
            });

            await putData(`users/${userId}`, userData);

            const token = await generateToken(userData.uid);

            setCookie('token', token, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                expires: expires
            });

            isLogin ? router.push('/auth/client-login') : router.push('/auth/driver/login');

            return userData;
        } catch (error) {
            console.error("Error signing up:", error);
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

    const checkUserExists = async (uid, collection) => {
            const userRef = ref(database, `${collection}/${uid}`);
        
            const userSnapshot = await get(userRef);
        
            if (!userSnapshot.exists()) {
                return null;
            }
        
            return userSnapshot.val();
        };

    const loginUser = async (email, password) => {
        try {
            const userData = await checkUserExists(email, `users`);

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
        <UserContext.Provider value={{ user, createNewUser, verificationEmail, loginUser, logoutUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
