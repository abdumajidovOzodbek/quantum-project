import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faVideo, faUser, faComments } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-white flex flex-col items-center text-blue-400" : "text-white flex flex-col items-center";

    return (
        <header className="bg-blue-600 p-2 shadow-md fixed top-0 w-full z-10">
            <nav className="container mx-auto flex justify-around items-center">
                <NavLink to="/news" className={navLinkClass}>
                    <FontAwesomeIcon icon={faNewspaper} size="lg" />
                    <span className="mt-1 text-xs">News</span>
                </NavLink>
                <NavLink to="/videos" className={navLinkClass}>
                    <FontAwesomeIcon icon={faVideo} size="lg" />
                    <span className="mt-1 text-xs">Videos</span>
                </NavLink>
                <NavLink to="/users" className={navLinkClass}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                    <span className="mt-1 text-xs">Users</span>
                </NavLink>
                <NavLink to="/chat" className={navLinkClass}>
                    <FontAwesomeIcon icon={faComments} size="lg" />
                    <span className="mt-1 text-xs">Chat</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
