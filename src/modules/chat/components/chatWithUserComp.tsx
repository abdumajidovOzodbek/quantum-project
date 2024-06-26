import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { host, senderId, useToGetprofile, useUserById } from '../../profiles/hooks/useProfile';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';
import {Message} from '../interfaces/interface'


export const socket: Socket = io(host);

const ChatWithUser: React.FC = () => {
    const { userId }: any = useParams<{ userId: string }>();
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const { data, error, isLoading } = useUserById(userId);
    const profile = useToGetprofile(senderId);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get<Message[]>(`${host}messages/${senderId}/${userId}`);
                setMessages(response.data);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages();

        socket.emit('join room', senderId);

        socket.on('chat message', (newMessage: Message) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('chat message');
            socket.emit('leave room', senderId);
        };
    }, [senderId, userId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: Message = {
                sender: senderId,
                receiverId: userId,
                type: 'text',
                content: message,
                mediaUrl: '',
            };

            socket.emit('chat message', newMessage);
            setMessage('');
        }
    };

    return (
        data ? (
            <div className="flex flex-col flex-auto h-[650px] p-6 bg-blue-100 overflow-y-auto">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 overflow-y-auto">
                    <div className="flex items-center mb-4 bg-blue-100 rounded-2xl">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={ host+ data.user.profilePicture} alt={data.name} />
                        </div>
                        <div className="ml-3">
                            <div className="text-lg font-semibold">{data.user.username}</div>
                        </div>
                    </div>

                    <div className="flex flex-col h-full overflow-y-auto mb-4">
                        <div className="flex flex-col-reverse h-full overflow-y-auto">
                            <div className="grid grid-cols-12 gap-y-2">
                                {profile.data && messages.length > 0 ? messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`col-span-12 flex ${msg.sender === senderId ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`relative text-sm py-2 px-4 shadow rounded-xl ${msg.sender === senderId ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                                } ${msg.sender === senderId ? 'ml-3' : 'mr-3'}`}
                                        >
                                            <div>{msg.content}</div>
                                        </div>
                                    </div>
                                )) : <div className='flex flex-col items-center justify-center h-full p-6 w-full'>
                                    <p className="text-lg font-semibold text-gray-600">No messages</p>
                                    </div>}
                            </div>
                        </div>
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button
                                    className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                    onClick={handleSendMessage}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button
                                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                onClick={handleSendMessage}
                            >
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18zm0 0v-8"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 bg-blue-100 w-full">
                <p className="text-lg font-semibold text-gray-600">Select a chat</p>
            </div>
        )
    );
};

export default ChatWithUser;
