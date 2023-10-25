import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import React, { useEffect } from "react";

export default function Layout() {

    const [showBackToTop, setShowBackToTop] = React.useState(false)

    const BackToTop = () => <button className="backToTop" onClick={goToTop}>UP</button>

    function goToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", () => window.scrollY > 200 ? setShowBackToTop(true) : setShowBackToTop(false))
    }
    )

    return (
        <>
        <Header />
        <Outlet />
        {showBackToTop && <BackToTop />}
        <Footer />
        </>
    )
}