import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";
import ScrollToTop from "./scrollToTop";

function LandingPageLayout() {
    return (
        <>
        <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingPageLayout;
