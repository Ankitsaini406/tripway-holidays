"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function FacebookAnalytics() {
    const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_ID; // ✅ public env var

    if (process.env.NODE_ENV !== "production" || !FACEBOOK_ID) {
        return null;
    }

    return (
        <>
            {/* Load Facebook Pixel with better loading strategy */}
            <Script
                id="facebook-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !(function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)})(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FACEBOOK_ID}');
            fbq('track', 'PageView');
          `,
                }}
            />

            {/* NoScript fallback */}
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
    );
}
