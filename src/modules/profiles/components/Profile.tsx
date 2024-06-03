import React from 'react';
import { useAllUsers } from '../hooks/useProfile';
import { Link } from 'react-router-dom';

const Profiles = () => {
    const { data, isLoading, error } = useAllUsers();

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading profiles.</p>;

    return (
        <>
            <h2 className="text-4xl font-extrabold text-center my-8 text-gray-800">Profiles</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {data && data.users.map((user: any) => (
                    <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                        <img
                            src={`http://localhost:3000/${user.profilePicture}`}
                            alt={`${user.username}'s profile`}
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
                        />
                        <p className="text-xl font-semibold text-gray-700">{user.username}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg"
                        >
                            View Profile
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Profiles;
