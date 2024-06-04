import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faNewspaper, faPen, faFilm } from '@fortawesome/free-solid-svg-icons';
import { host, senderId, useToGetprofile } from '../../profiles/hooks/useProfile';
import { deleteAccount, deleteProfilePicture, updateProfile, uploadPicture } from '../services/useMyprofileService';
import ErrorModal from '../../Errors/error'; // Adjust the path if necessary

const MyProfile = () => {
    const { data, error, isLoading } = useToGetprofile(senderId);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handlePictureChange = (e) => {
        setSelectedPicture(e.target.files[0]);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <ErrorModal message={error.message} onClose={() => setErrorMessage(null)} />
        );
    }

    const profile = data.user;

    const handleUploadPicture = async () => {
        if (!selectedPicture) {
            console.log("No picture selected");
            return;
        }
        try {
            const uploaded = await uploadPicture(selectedPicture);
            if (uploaded.user) {
                location.reload();
            }
        } catch (err:any) {
            setErrorMessage(err.response.data.message);
        }
    };

    const handleDeletePicture = async () => {
        try {
            await deleteProfilePicture();
            location.reload();
        } catch (err:any) {
            setErrorMessage(err.response.data.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            localStorage.clear();
            location.reload();
        } catch (err:any) {
            setErrorMessage(err.response.data.message);
        }
    };

    const handleLogout = async () => {
        localStorage.clear()
    };

    const handleUsernameUpdate = async () => {
        // Logic to update username
        try {
            await updateProfile(username)
            location.reload()
        } catch (error:any) {
            setErrorMessage(error.response.data.message)
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {errorMessage && (
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />
        )}
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-5">
                <div className="flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full ring ring-purple-300 ring-offset-base-100 ring-offset-2">
                        <img src={host + profile.profilePicture} alt="Profile" className="w-full h-full rounded-full" />
                    </div>
                </div>
                <div className="text-center mt-5">
                    <h2 className="font-semibold text-gray-700 text-lg">@{profile.username}</h2>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                    <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" htmlFor="upload-photo">
                        Choose picture
                        <input id="upload-photo" type="file" accept="image/*" onChange={handlePictureChange} className="sr-only" />
                    </label>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 flex items-center" onClick={handleUploadPicture}>
                        Upload
                    </button>
                    {profile.profilePicture !== 'uploads/default-avatar.png' && (
                        <button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5" onClick={handleDeletePicture}>
                            Delete current photo
                        </button>
                    )}
                </div>
                <div className="flex justify-center mt-4 gap-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5" onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg text-sm px-5 py-2.5" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-center">
                        <input
                            type="text"
                            className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5 mr-2 flex-1"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter new username"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5" onClick={handleUsernameUpdate}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <nav className="mt-8">
            <ul className="flex flex-col space-y-2">
                <li>
                    <NavLink to="/my-new-posts" className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium py-2.5 px-4 transition duration-200 ease-in-out transform hover:translate-y-1">
                        <FontAwesomeIcon icon={faPen} className="w-5 h-5" />
                        <span>My New Posts</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-videos" className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium py-2.5 px-4 transition duration-200 ease-in-out transform hover:translate-y-1">
                        <FontAwesomeIcon icon={faFilm} className="w-5 h-5" />
                        <span>My Videos</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MyProfile;
