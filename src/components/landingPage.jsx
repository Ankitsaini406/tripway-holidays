import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";
import ScrollToTop from "../utils/scrollToTop";
import { Toaster } from "react-hot-toast";

function LandingPageLayout() {

    const location = useLocation();
    const hideHeaderFooter = ["/login", "/signup"];

    return (
        <>
        <Toaster position="top-right" reverseOrder={false} />
        <ScrollToTop />
            {!hideHeaderFooter.includes(location.pathname) && <Header />}
            <Outlet />
            {!hideHeaderFooter.includes(location.pathname) && <Footer />}
        </>
    )
}

export default LandingPageLayout;
