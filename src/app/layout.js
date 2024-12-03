'use client';

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

  return (
    <html lang="en">
      <body>
        <UserProvider>
        {!hideHeaderFooter && <Header />}
          {/* <Header /> */}
          <main>{children}</main>
          <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} draggable={true} closeOnClick />
          {/* <Footer /> */}
          {!hideHeaderFooter && <Footer />}
        </UserProvider>
      </body>
    </html>
  );
}
