import React, { useState } from 'react';

const MyProfile = () => {
    // Sample profile data
    const [profile, setProfile] = useState({
        username: "john_doe",
        fullName: "John Doe",
        email: "john@example.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profilePicture: "https://via.placeholder.com/150",
    });


    const handleUploadPicture = () => {
        // Logic to handle picture upload
        console.log("Upload picture clicked");
    };

    const handleDeletePicture = () => {
        // Logic to delete profile picture
        console.log("Delete picture clicked");
    };

    const handleDeleteAccount = () => {
        // Logic to delete user account
        console.log("Delete account clicked");
    };

    const handleLogout = () => {
        // Logic to logout user
        console.log("Logout clicked");
    };

    const handleUsernameUpdate = () => {
        // Logic to update username
        console.log("Update username clicked");
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center justify-center">
                        <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-semibold">{profile.fullName}</h2>
                        <p className="text-gray-600">@{profile.username}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">About Me</h3>
                        <p className="text-gray-600">{profile.bio}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        <p className="text-gray-600">Email: {profile.email}</p>
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleUploadPicture}>Upload Picture</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleDeletePicture}>Delete Picture</button>
                    </div>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleDeleteAccount}>Delete Account</button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="flex justify-center mt-6">
                        <input type="text" className="border border-gray-300 rounded-lg p-2 mr-2" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleUsernameUpdate}>Update Username</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
