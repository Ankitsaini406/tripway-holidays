'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TourPackages from './tourPackages';

const TourPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return <TourPackages type={type} />;
};

export default TourPage;
