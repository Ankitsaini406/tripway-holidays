'use client';

import { useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { UserProvider } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function Layout({ children }) {
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
    // script.src = `https://embed.tawk.to/67517c5c2480f5b4f5a8085a/1ieb4riog`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }
  }, [hideHeaderFooter, pathname, bot_url]);

  return (
    <html lang="en">
      <body>
        <UserProvider>
          {!hideHeaderFooter && <Header />}
          <main>{children}</main>
          <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} draggable={true} closeOnClick />
          {!hideHeaderFooter && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
