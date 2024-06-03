import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../auth/components/AuthProvider"
import Navbar from './navbar'
import Footer from './footer'
const Layout: React.FC = () => {
    return (
        <>
            <div className="mb-[55px]">
                <Navbar />
            </div>
            <AuthProvider>
                <Outlet />
            </ AuthProvider>
            <div className="mt-[70px]">
                <Footer />
            </div>

        </>

    );
}

export default Layout;
