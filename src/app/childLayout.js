'use client';

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/header";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import GoogleTagManagerAndAnalytics from "./googleAnalytics";
const Footer = dynamic(() => import("@/components/footer"));
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function ClientRootLayout({ children }) {
    const pathname = usePathname();

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
    }, [hideHeaderFooter, pathname, bot_url]);

    return (
        <>
            <GoogleTagManagerAndAnalytics />
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            <ToastContainer position="top-right" autoClose={10000} hideProgressBar={true} draggable={true} closeOnClick />
            {!hideHeaderFooter && <Footer />}
        </>
    );
}
