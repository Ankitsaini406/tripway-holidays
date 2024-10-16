import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header";

function LandingPageLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default LandingPageLayout;
