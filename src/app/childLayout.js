'use client';

import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import GoogleAnalytics from "./googleAnalytics";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { routeMetaData } from "@/types/metadataConfig";

export default function ClientRootLayout({ children }) {
    const pathname = usePathname();
    const [metadata, setMetadata] = useState({
        title: "TripWay Holidays",
        description: "Book Tour Next Tripway Holidays",
    });

    const noHeaderFooterRoutes = ['/auth/client-login', '/auth/signup', '/auth/agent-login'];
    const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);

    const bot_url = process.env.BOT_URL;

    useEffect(() => {
        if (!hideHeaderFooter) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = `${bot_url}`;
            script.charset = "UTF-8";
            script.setAttribute("crossorigin", "*");

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }

        const meta = routeMetaData[pathname] || {
            title: "TripWay Holidays",
            description: "Book Tour Next Tripway Holidays",
        };
        setMetadata(meta);
    }, [hideHeaderFooter, pathname, bot_url]);

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <GoogleAnalytics />
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} draggable={true} closeOnClick />
            {!hideHeaderFooter && <Footer />}
        </>
    );
}
