'use client';

import Footer from "../components/footer";
import Header from "../components/header";
import { UserProvider } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function Layout({ children }) {

  const pathname = usePathname();
  const noHeaderFooterRoutes = ['/auth/client-login', '/auth/signup', '/auth/agent-login'];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <UserProvider>
        {!hideHeaderFooter && <Header />}
          {/* <Header /> */}
          <main>{children}</main>
          {/* <Footer /> */}
          {!hideHeaderFooter && <Footer />}
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick />
        </UserProvider>
      </body>
    </html>
  );
}
