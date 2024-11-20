'use client';

import { useRouter } from 'next/navigation';
import { useClient } from '@/context/UserContext';

function ProfilePage() {
    const router = useRouter();
    const { user, logoutUser } = useClient();

    const handleLogOut = () => {
        logoutUser();
        router.push('/');
    };

    return (
        <div className="layout">
            <div>
                Your Profile Page: {user?.email || 'Guest'}
            </div>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    );
}

export default ProfilePage;
