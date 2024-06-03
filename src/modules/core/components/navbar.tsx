import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faVideo, faUser, faComments } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "text-white flex flex-col items-center text-blue-400" : "text-white flex flex-col items-center";

    return (
        <header className="bg-blue-600 p-4 shadow-md">
            <nav className="container mx-auto flex justify-around items-center">
                <NavLink to="/news" className={navLinkClass}>
                    <FontAwesomeIcon icon={faNewspaper} size="2x" />
                    <span className="mt-2">News</span>
                </NavLink>
                <NavLink to="/videos" className={navLinkClass}>
                    <FontAwesomeIcon icon={faVideo} size="2x" />
                    <span className="mt-2">Videos</span>
                </NavLink>
                <NavLink to="/profiles" className={navLinkClass}>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                    <span className="mt-2">Profiles</span>
                </NavLink>
                <NavLink to="/chat" className={navLinkClass}>
                    <FontAwesomeIcon icon={faComments} size="2x" />
                    <span className="mt-2">Chat</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
