
import React from 'react';
import Script from 'next/script';

const GoogleTagManagerAndAnalytics = () => {

    const GA_TACAK = process.env.GA_TRACKING_ID;
    const GTM_TRACK = process.env.GTM_TRACKING_ID;

    return (
        <>
            {/* GTM Script */}
            <Script defer={true} id="google-tag-manager" strategy="afterInteractive">
                {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_TRACK}');
        `}
            </Script>

            {/* GTM NoScript */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${GTM_TRACK}`}
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>


            {/* GA Script */}
            <Script
                defer={true}
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TACAK}`}
            />

            <Script defer={true} id='' strategy='lazyOnload'>
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

export default GoogleTagManagerAndAnalytics;