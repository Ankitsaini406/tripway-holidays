'use client';

import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function FaceBookAnalytics({ Component, pageProps }) {

    const FACEBOOK_ID = process.env.FACEBOOK_ID;

    useEffect(() => {
        // Initialize Meta Pixel
        if (typeof window !== "undefined") {
            !function(f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function() {
                    n.callMethod
                        ? n.callMethod.apply(n, arguments)
                        : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            }(
                window,
                document,
                "script",
                "https://connect.facebook.net/en_US/fbevents.js"
            );
            fbq("init", `${FACEBOOK_ID}`);
            fbq("track", "PageView");
        }
    }, [FACEBOOK_ID]);

    return (
        <>
            <Head>
                {/* Meta Pixel noscript fallback */}
                <noscript>
                    <Image
                        alt="Facebook"
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src={`https://www.facebook.com/tr?id=${FACEBOOK_ID}&ev=PageView&noscript=1`}
                    />
                </noscript>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
