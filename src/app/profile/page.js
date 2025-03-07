'use client';

import React, { useState, useEffect } from 'react';
import { updatePhoneNumber, updateProfile } from 'firebase/auth';
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
    const { user, logoutUser } = useClient();
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
                const userRef = ref(database, `users/${userData?.uid}`);
                await update(userRef, updatedValues);

                const user = auth.currentUser;
                if (user && updatedValues.displayName) {
                    await updateProfile(user, { displayName: updatedValues.displayName });
                    await updatePhoneNumber(user, { phoneNumber: updatedValues.phoneNumber });
                }

                setOriginalAccountDetails({
                    displayName: accountDetails.displayName,
                    phoneNumber: accountDetails.phoneNumber,
                    address: accountDetails.address,
                });

                toast.success('User updated successfully');
            } catch (error) {
                toast.success('Error updating account details:', error);
            }
        } else {
            toast.info('No changes detected');
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
                    <ProfileHeader userData={userData} logoutUser={logoutUser} />
                    <div className={styles.profileDetailsBox}>
                        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} agentBookings={agentBookings} userBookings={userBookings} role={userData?.role} />
                        {activeTab === 'accountSetting' ? (
                            <AccountSettings userData={userData} accountDetails={accountDetails} handleInputChange={handleInputChange} handleSaveChanges={handleSaveChanges} handleCancel={handleCancel} />
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
                                    <TourTable uid={userData?.uid} bookings={activeTab === 'agentRef' ? filteredAgentBookings : filteredUserBookings} loading={loadingBookings} role={userData?.role} tabType={activeTab === 'agentRef' ? 'referral' : 'booking'} />
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
