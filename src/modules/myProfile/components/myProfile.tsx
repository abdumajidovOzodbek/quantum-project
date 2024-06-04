import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faNewspaper, faPen, faFilm } from '@fortawesome/free-solid-svg-icons';
import { useToGetprofile } from '../../profiles/hooks/useProfile';
import { senderId } from '../../auth/states/useAuthStore';
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
        } catch (err) {
            setErrorMessage(err.response.data.message);
        }
    };

    const handleDeletePicture = async () => {
        try {
            await deleteProfilePicture();
            location.reload();
        } catch (err) {
            setErrorMessage(err.response.data.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            localStorage.clear();
            location.reload();
        } catch (err) {
            setErrorMessage(err.response.data.message);
        }
    };

    const handleLogout = async () => {
        // Logic to logout user
        console.log("Logout clicked");
    };

    const handleUsernameUpdate = async () => {
        // Logic to update username
        try {
            await updateProfile(username)
            location.reload()
        } catch (error) {
            console.log(error);
            
            setErrorMessage(error.response.data.message)
        }
    };

    return (
        <div className="container mx-auto py-8">
            {errorMessage && (
                <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />
            )}
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center justify-center">
                        <img src={'http://localhost:3000/' + profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-gray-600">@{profile.username}</h2>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">About Me</h3>
                        <p className="text-gray-600">{profile.bio}</p>
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePictureChange}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleUploadPicture}>
                            Upload Picture
                        </button>
                        {profile.profilePicture !== 'uploads/default-avatar.png' && (
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleDeletePicture}>
                                Delete Picture
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleDeleteAccount}>
                            Delete Account
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    <div className="flex justify-center mt-6">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 mr-2"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleUsernameUpdate}>
                            Update Username
                        </button>
                    </div>
                </div>
            </div>
            <nav className="mt-8">
                <ul className="flex flex-col space-y-2">
                    <li>
                        <NavLink to="/my-new-posts" className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faPen} className="w-6 h-6" />
                            <span>My New Posts</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-videos" className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faFilm} className="w-6 h-6" />
                            <span>My Videos</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MyProfile;
