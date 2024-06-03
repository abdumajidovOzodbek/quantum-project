import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../auth/components/AuthProvider"
import Navbar from './navbar'
const Layout: React.FC = () => {
    return (
        <>
        <Navbar/>
        <AuthProvider>
            <Outlet />
        </ AuthProvider>
        </>
        
    );
}

export default Layout;
