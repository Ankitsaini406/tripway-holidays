'use client';

import { signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { set, ref, get } from "firebase/database";
import { jwtDecode } from 'jwt-decode';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { generateAgentCode, generateToken } from "@/utils/Utils";

const UserContext = createContext(null);

export const useClient = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    useEffect(() => {
        const savedToken = getCookie('token');
        if (savedToken) {
            try {
                if (savedToken.split('.').length === 3) {
                    const decodedToken = jwtDecode(savedToken);
                    setUser(decodedToken);
                } else {
                    console.error("Invalid token format:", savedToken);
                    deleteCookie('token');
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                deleteCookie('token');
            }
        }

        return () => unsubscribe();
    }, []);


    const createNewUser = async (data) => {
        try {
            if (!data.phoneNumber || !data.countryCode) {
                throw new Error("Phone number or country code is missing.");
            }
    
            const userId = data.countryCode + data.phoneNumber;
            const existingUser = await checkUserExists(userId, `users`);
    
            if (existingUser) {
                console.log("User already exists:", existingUser);
                toast.info(`🚀 User already exists as a ${existingUser.role}. Please log in!`);
    
                switch (existingUser.role) {
                    case 'User':
                        router.push('/auth/user/login');
                        break;
                    case 'Agent':
                        router.push('/auth/agent/login');
                        break;
                    default:
                        router.push('/auth/driver/login');
                }
    
                return existingUser;
            }
    
            const isLogin = data.role !== 'Driver' && data.role !== 'Agent';
            const email = data.email;

            const agentCode = data.role === 'Agent' ? generateAgentCode(data) : null;

            const userData = {
                uid: userId,
                email,
                isLogin,
                ...data,
            };

            if (data.role === 'Agent') {
                userData.agentCode = agentCode;
            } else {
                delete userData.agentCode;
            }

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
    
            switch (userData.role) {
                case 'User':
                    router.push('/auth/user/login');
                    break;
                case 'Agent':
                    router.push('/auth/agent/login');
                    break;
                default:
                    router.push('/auth/driver/login');
            }
    
            return userData;
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    };

    const putData = (key, data) => set(ref(database, key), data);

    const checkUserExists = async (uid, collection) => {
        const userRef = ref(database, `${collection}/${uid}`);

        const userSnapshot = await get(userRef);

        if (!userSnapshot.exists()) {
            return null;
        }

        return userSnapshot.val();
    };

    const loginUser = async (phoneNumber) => {
        try {
            const userData = await checkUserExists(phoneNumber, `users`);

            if (!userData) {
                throw new Error("No account found with this phone number.");
            }

            if (!userData.isLogin) {
                throw new Error("You are not an authenticated user.");
            }

            const userRef = ref(database, `users/${phoneNumber}`);
            const userSnapshot = await get(userRef);

            setUser({
                uid: userSnapshot.uid,
                email: userSnapshot.email,
            });

            const idToken = await generateToken(userData.uid);
            setCookie('token', idToken, {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                expires: expires
            });

            return { user: userSnapshot };
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            deleteCookie('token', { path: '/', domain: window.location.hostname });
            router.push('/auth/user/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, createNewUser, loginUser, logoutUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
