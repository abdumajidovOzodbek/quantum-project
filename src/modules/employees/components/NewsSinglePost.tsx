import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { host } from '../../profiles/hooks/useProfile';

const SinglePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>(); // Get postId from URL params
    const { data, error, isLoading }: any = usePosts();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center mt-4">Error: {(error as Error).message}</div>;

    // Find the post with the postId
    const post = data.posts.find((post: any) => post._id === postId);

    if (!post) return <div className="text-center mt-4 text-gray-600">Post not found</div>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">{post.title}</h1>
            <div className="flex items-center mb-6">
                <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full border border-gray-300" src={host + post.author.profilePicture} alt="Author Avatar" />
                </div>
                <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{post.author.username}</p>
                    <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="prose max-w-full mx-auto">
                <p className="text-gray-700">{post.content}</p>
                {post.mediaUrl && (
                    <div className="mt-4">
                        <img className="rounded-md shadow-md h-[400px] w-[400px]" src={host + post.mediaUrl} alt="Post Media" />
                    </div>
                )}
            </div>
            <div className="mt-8 text-center">
                <Link to="/news" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to News
                </Link>
            </div>
        </div>
    );
};

export default SinglePost;
