"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/layout/header";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import SmoothScrollLayout from "@/components/SmoothScroll";
const Footer = dynamic(() => import("@/components/layout/footer"));
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Template from "./template";

export default function ClientRootLayout({ children }) {
    const pathname = usePathname();

    const noHeaderFooterRoutes = [
        "/auth/user/login",
        "/auth/user/signup",
        "/auth/agent/login",
        "/auth/agent/signup",
        "/auth/driver/login",
        "/auth/driver/signup",
    ];
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
            <SmoothScrollLayout>
                {!hideHeaderFooter && <Header />}
                <Template key={pathname}>
                    <main className="minHeight">{children}</main>
                </Template>
                <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} draggable={true} closeOnClick />
                {!hideHeaderFooter && <Footer />}
            </SmoothScrollLayout>
    );
}
