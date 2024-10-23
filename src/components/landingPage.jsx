import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";
import ScrollToTop from "./scrollToTop";
import { Toaster } from "react-hot-toast";

function LandingPageLayout() {
    return (
        <>
        <Toaster position="top-right" reverseOrder={false} />
        <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingPageLayout;
