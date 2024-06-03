import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const Upload = () => {
    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Upload Component</h1>
            <nav>
                <ul className="flex flex-col space-y-2">
                    <li>
                        <NavLink to="/upload-video" className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faVideo} className="w-6 h-6" />
                            <span>Upload Video</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload-news" className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faNewspaper} className="w-6 h-6" />
                            <span>Upload News</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Upload;
