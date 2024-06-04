import React, { useState } from "react";
import { useUserPostsById } from "../hooks/useMyProfile";
import ErrorModal from "../../Errors/error";
import { deletePostByid, UpdateByPostId } from "../services/useMyprofileService";
import { useNavigate } from "react-router-dom";
import { host, senderId } from "../../profiles/hooks/useProfile";

const MyVideos = () => {
    const { data, isLoading, error } = useUserPostsById(senderId);
    const [errorMessage, setErrorMessage] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedPostData, setEditedPostData] = useState({ title: "" });
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) return <div>Error: {(error as Error).message}</div>;

    const deletePost = async (postId) => {
        try {
            await deletePostByid(postId);
            await location.reload();
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response);
        }
    };

    const updatePost = async (postId) => {
        try {
            await UpdateByPostId(postId, editedPostData);
            setEditingPostId(null);
            await location.reload();
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response);
        }
    };

    const cancelEdit = () => {
        setEditingPostId(null);
        setEditedPostData({ title: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPostData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const filteredPosts = data.posts.filter((post) => post.type === 'video');

    return (
        <div className="container mx-auto py-8">
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {data && filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <div key={post._id} className={`bg-white rounded-lg shadow-lg p-6 mb-4 ${editingPostId === post._id ? 'border border-blue-500' : ''}`}>
                        {editingPostId === post._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={editedPostData.title}
                                    onChange={handleInputChange}
                                    className="mb-2 p-2 border border-gray-300 rounded text-xl font-semibold mb-2"
                                />
                                <div className="flex justify-between">
                                    <button onClick={() => updatePost(post._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">Save</button>
                                    <button onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-0">
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                {post.mediaUrl && <video src={ host+ post.mediaUrl} className="rounded-lg h-[400px] w-[600px] bg-black" controls />}
                                <div className="flex justify-between">
                                    <button onClick={() => deletePost(post._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600">Delete</button>
                                    <button onClick={() => {
                                        setEditingPostId(post._id);
                                        setEditedPostData({ title: post.title });
                                    }} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">Edit</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <>
                    <p>you have no video post </p>
                    {setTimeout(() => { navigate('/upload') }, 3000)}
                </>
            )}
        </div>
    );
};

export default MyVideos;
