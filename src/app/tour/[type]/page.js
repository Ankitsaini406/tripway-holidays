'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';  // Use this hook instead of useRouter
import TourPackages from '../page'; // Import the TourPackages component

const TourPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();
    const type = searchParams.get('type');  // Get 'type' query parameter

    // Ensure the component is only rendered on the client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Avoid rendering until the component is mounted
    if (!isMounted) {
        return <div>Loading...</div>;  // Or a loading spinner component
    }

    console.log('Dynamic route type:', type); // Log the 'type' to see if it's correct

    return <TourPackages type={type} />;  // Pass 'type' to the TourPackages component
};

export default TourPage;
