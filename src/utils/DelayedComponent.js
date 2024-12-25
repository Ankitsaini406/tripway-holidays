'use client';

import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/utils/lodingSpinner";


const DelayedComponent = ({ delay, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, delay);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [delay]);

    return show ? children : <LoadingSpinner />;
};

export default DelayedComponent