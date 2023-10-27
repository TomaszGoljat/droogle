import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import React, { useEffect } from "react";

export default function Layout() {


    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}