'use client';

import Footer from "../components/footer";
import Header from "../components/header";
import { UserProvider } from "@/context/UserContext";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick />
        </UserProvider>
      </body>
    </html>
  );
}
