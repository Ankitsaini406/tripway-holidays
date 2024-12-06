
import React from 'react';
import Script from 'next/script';

const GoogleAnalytics = () => {

    const GA_TRACK_ID = process.env.NEXT_APP_GA_TRACKING_ID;
    const GA_TACAK = process.env.GA_TRACKING_ID;

    return (
        <>
            <Script
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TACAK}`}
            />

            <Script id='' strategy='lazyOnload'>
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TACAK}', {
              page_path: window.location.pathname,
              });
          `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;