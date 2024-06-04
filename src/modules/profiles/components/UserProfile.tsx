import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { host, useUserById } from '../hooks/useProfile';

const UserProfile = () => {
    const { userId }: any = useParams();
    const { data, isLoading, error }: any = useUserById(userId);
    const navigate = useNavigate()
    const handleSendMessage = () => {
        navigate(`/chat/${userId}`);
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading user profile.</p>;

    return (
        <>
            {data && (
                <div className="bg-white shadow-lg rounded-lg p-8 m-8 max-w-lg mx-auto text-center transition-transform transform hover:scale-105">
                    <img
                        src={host + data.user.profilePicture}
                        alt={`${data.user.username}'s profile`}
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-500"
                    />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.user.username}</h2>
                    <p className="text-gray-600 mb-4">{'life'}</p>
                    <button onClick={handleSendMessage} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Send Message
                    </button>
                </div>
            )}
        </>
    );
};

export default UserProfile;
