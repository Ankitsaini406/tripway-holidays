'use client';

import { useEffect } from "react";

export default function FacebookAnalytics() {
    const FACEBOOK_ID = process.env.FACEBOOK_ID;

    useEffect(() => {
        // Only run in production
        if (process.env.NODE_ENV !== "production") {
            console.log("Facebook Pixel is disabled in development.");
            return;
        }

        // Ensure 'fbq' is defined as a fallback
        window.fbq =
            window.fbq ||
            function () {
                window.fbq.callMethod
                    ? window.fbq.callMethod(...arguments)
                    : window.fbq.queue.push(arguments);
            };

        window.fbq.queue = window.fbq.queue || [];
        window.fbq.version = '2.0';
        window.fbq.loaded = true;

        // Dynamically load Facebook Pixel script
        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";

        script.onload = () => {
            try {
                if (window.fbq) {
                    window.fbq("init", FACEBOOK_ID);
                    window.fbq("track", "PageView");
                }
            } catch (error) {
                console.error("Error initializing Facebook Pixel:", error);
            }
        };

        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, [FACEBOOK_ID]);

    // Render the fallback for production only
    return process.env.NODE_ENV === "production" ? (
        <>
            {/* Meta Pixel noscript fallback */}
            <noscript>
                <img
                    alt="Facebook Pixel"
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${FACEBOOK_ID}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    ) : null;
}
