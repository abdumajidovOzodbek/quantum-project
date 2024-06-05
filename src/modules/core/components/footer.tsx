import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { senderId } from '../../profiles/hooks/useProfile';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 p-4 fixed bottom-0 w-full z-10">
            <div className="container mx-auto flex justify-around items-center">
                <NavLink to={"/profile/" + senderId} className="text-white flex flex-col items-center" >
                    <FontAwesomeIcon icon={faUserCircle} size="lg" />
                    <span className="mt-1 text-xs">My Profile</span>
                </NavLink>
                <NavLink to="/upload" className="text-white flex flex-col items-center" >
                    <FontAwesomeIcon icon={faUpload} size="lg" />
                    <span className="mt-1 text-xs">Upload Post</span>
                </NavLink>
            </div>
        </footer>
    );
};

export default Footer;
