'use client';

import { useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { usePathname } from "next/navigation";
import { ToastContainer, Zoom } from "react-toastify";
import GoogleTagManagerAndAnalytics from "./googleAnalytics";
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
            <ToastContainer position="top-right" autoClose={10000} hideProgressBar={true} draggable={true} closeOnClick transition={Zoom} theme="dark" />
            {!hideHeaderFooter && <Footer />}
        </>
    );
}
