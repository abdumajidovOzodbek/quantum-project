import React from 'react';
import { host, senderId, useAllUsers } from '../../profiles/hooks/useProfile';
import ChatWithUser from './chatWithUserComp';
import { Link } from 'react-router-dom';

const Chat = () => {

    const { data, isLoading, error } = useAllUsers()
    const createUserButton = (user:any) => {
        if (user._id === senderId) {
            return null; 
        }

        return (
            <Link className='flex flex-row items-center hover:bg-gray-100 rounded-xl p-2' key={user._id} to={user._id}>
                <img src={host + user.profilePicture} className='flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full' />
                <b className='ml-2 text-sm font-semibold'>{user.username}</b>
            </Link>
        );
    };

    return (
        data && <div className="flex h-[640px] antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-none">
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5"></path>
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-2xl">QuickChat</div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Active Conversations</span>
                            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{data.users.length}</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 mx-2 h-[400px] overflow-y-auto">
                            {data.users.map((user: any) => createUserButton(user))}
                        </div>
                    </div>
                </div>
                <>
                    <ChatWithUser />
                </>
            </div>
        </div>
    );
}

export default Chat;
