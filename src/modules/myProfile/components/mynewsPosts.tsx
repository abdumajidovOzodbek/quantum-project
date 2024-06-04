import React, { useState } from "react";
import { useUserPostsById } from "../hooks/useMyProfile";
import ErrorModal from "../../Errors/error";
import { deletePostByid, UpdateByPostId } from "../services/useMyprofileService";
import { host, senderId } from "../../profiles/hooks/useProfile";

const MyNews = () => {
    const { data, isLoading, error } = useUserPostsById(senderId);
    const [errorMessage, setErrorMessage] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedPostData, setEditedPostData] = useState({ title: "", content: "" });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) return <div>Error: {(error as Error).message}</div>;

    const deletePost = async (postId: any) => {
        try {
            await deletePostByid(postId);
            await location.reload();
        } catch (error:any) {
            setErrorMessage(error.response);
        }
    };

    const updatePost = async (postId: any) => {
        try {
            await UpdateByPostId(postId, editedPostData);
            setEditingPostId(null);
            await location.reload();
        } catch (error:any) {
            setErrorMessage(error.response);
        }
    };

    const cancelEdit = () => {
        setEditingPostId(null);
        setEditedPostData({ title: "", content: "" });
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setEditedPostData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const filteredPosts = data.posts.filter((post: { type: string; }) => post.type === 'news');

    return (
        <div className="container mx-auto py-8">
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {data && data.posts && filteredPosts.length > 0 ? (
                filteredPosts.map((post: { _id: React.Key | React.SetStateAction<null> | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; mediaUrl: string; }) => (
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
                                <input
                                    name="content"
                                    value={editedPostData.content}
                                    onChange={handleInputChange}
                                    className="mb-2 p-2 border border-gray-300 rounded text-xl font-semibold mb-2"
                                ></input>
                                <div className="flex justify-between">
                                    <button onClick={() => updatePost(post._id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">Save</button>
                                    <button onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-700 mb-4">{post.content}</p>
                                {post.mediaUrl && <img src={host + post.mediaUrl} alt="Post Media" className="mb-4 rounded-lg" />}
                                <div className="flex justify-between">
                                    <button onClick={() => deletePost(post._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600">Delete</button>
                                    <button onClick={() => {
                                        setEditingPostId(post._id);
                                        setEditedPostData({ title: post.title, content: post.content });
                                    }} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">Edit</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>you have no news </p>
            )}
        </div>
    );
};

export default MyNews;
