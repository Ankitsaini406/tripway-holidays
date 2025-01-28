'use client';

import React, { useState, useEffect } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { useClient } from '@/context/UserContext';
import useUserBookings from '@/hook/useUserBooking';
import styles from '@/styles/pages/profile.module.css';
import { auth, database } from '@/firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { ProfileLoding, ProfileTbale } from './lodingProfile';
import ProfileTabs from './(components)/ProfileTabs';
import AccountSettings from './(components)/AccountSettings';
import ProfileHeader from './(components)/ProfileHeader';
import TourTable from './(components)/TourTables';

function ProfilePage() {
    const { user, verificationEmail, logoutUser } = useClient();
    const {
        userData,
        agentBookings = [],
        userBookings = [],
        loadingUser,
        loadingBookings,
        error,
    } = useUserBookings(user);

    const [activeTab, setActiveTab] = useState('bookingHistory');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAgentBookings, setFilteredAgentBookings] = useState(agentBookings);
    const [filteredUserBookings, setFilteredUserBookings] = useState(userBookings);
    const [accountDetails, setAccountDetails] = useState({
        displayName: '',
        phoneNumber: '',
        address: '',
    });
    const [originalAccountDetails, setOriginalAccountDetails] = useState({
        displayName: userData?.name || '',
        phoneNumber: userData?.phoneNumber || '',
        address: userData?.address || '',
    });

    const [passwordDetails, setPasswordDetails] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
        setFilteredAgentBookings(agentBookings);
        setFilteredUserBookings(userBookings);
    }, [agentBookings, userBookings]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const bookings = activeTab === 'agentRef' ? agentBookings : userBookings;
        const setFiltered = activeTab === 'agentRef' ? setFilteredAgentBookings : setFilteredUserBookings;

        const filtered = bookings.filter((booking) =>
            Object.values(booking).some((value) =>
                value?.toString().toLowerCase().includes(query.toLowerCase())
            )
        );

        setFiltered(filtered);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setAccountDetails({
            displayName: originalAccountDetails.displayName,
            phoneNumber: originalAccountDetails.phoneNumber,
            address: originalAccountDetails.address,
        });
    };

    const handleSaveChanges = async () => {
        const updatedValues = {};
        // Check if each field has changed, and update accordingly
        if (accountDetails.displayName !== originalAccountDetails.displayName) {
            updatedValues.displayName = accountDetails.displayName;
        }
        if (accountDetails.phoneNumber !== originalAccountDetails.phoneNumber) {
            updatedValues.phoneNumber = accountDetails.phoneNumber;
        }
        if (accountDetails.address !== originalAccountDetails.address) {
            updatedValues.address = accountDetails.address;
        }

        if (Object.keys(updatedValues).length > 0) {
            try {
                // Update the Firebase Realtime Database directly
                const userRef = ref(database, `users/${userData?.uid}`);
                await update(userRef, updatedValues);

                const user = auth.currentUser;
                if (user && updatedValues.displayName) {
                    await updateProfile(user, { displayName: updatedValues.displayName });
                    await updatePhoneNumber(user, { phoneNumber: updatedValues.phoneNumber });
                }

                // Update the original account details to reflect the changes
                setOriginalAccountDetails({
                    displayName: accountDetails.displayName,
                    phoneNumber: accountDetails.phoneNumber,
                    address: accountDetails.address,
                });

                console.log('User updated successfully');
            } catch (error) {
                console.error('Error updating account details:', error);
                alert('Failed to update account details');
            }
        } else {
            console.log('No changes detected');
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordDetails((prev) => ({ ...prev, [name]: value }));

        if (name === 'confirmNewPassword' || name === 'newPassword') {
            setPasswordMatch(passwordDetails.newPassword === value);
        }
    };

    const handlePasswordUpdate = async () => {
        const { oldPassword, newPassword, confirmNewPassword } = passwordDetails;

        if (!passwordMatch || newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match!');
            return;
        }

        const user = auth.currentUser;

        if (user) {
            try {
                // Reauthenticate user before updating the password
                const credential = EmailAuthProvider.credential(user.email, oldPassword);
                await reauthenticateWithCredential(user, credential);

                // Update password
                await updatePassword(user, newPassword);

                const userRef = ref(database, `users/${userData?.uid}`);
                await update(userRef, {
                    password: newPassword,
                    verifyPassword: confirmNewPassword,
                });
                toast.success('Password updated successfully!');
                setPasswordDetails({
                    oldPassword: '',
                    password: '',
                    verifyPassword: '',
                });
            } catch (error) {
                console.error('Error updating password:', error);
                toast.error('Failed to update password. Please check your old password.');
            }
        } else {
            toast.error('User not authenticated.');
        }
    };

    return (
        <div className="layout">
            {loadingUser ? (
                <ProfileLoding />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.profile}>
                    <ProfileHeader userData={userData} user={user} verificationEmail={verificationEmail} logoutUser={logoutUser} />
                    <div className={styles.profileDetailsBox}>
                    <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} agentBookings={agentBookings} userBookings={userBookings} isAgent={userData?.isAgent} />
                        {activeTab === 'accountSetting' ? (
                            <AccountSettings userData={userData} accountDetails={accountDetails} passwordDetails={passwordDetails} handleInputChange={handleInputChange} handleSaveChanges={handleSaveChanges} handlePasswordChange={handlePasswordChange} handlePasswordUpdate={handlePasswordUpdate} handleCancel={handleCancel} passwordMatch={passwordMatch} />
                        ) : (
                            <div>
                                <input
                                    className={styles.searchBar}
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search here..."
                                />
                                {loadingBookings ? (
                                    <ProfileTbale />
                                ) : (
                                    <TourTable uid={userData?.uid} bookings={activeTab === 'agentRef' ? filteredAgentBookings : filteredUserBookings} loading={loadingBookings} isAgent={userData?.isAgent} tabType={activeTab === 'agentRef' ? 'referral' : 'booking'} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
