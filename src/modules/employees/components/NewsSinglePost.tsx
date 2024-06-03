import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

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
          if (error) return <div>Error: {(error as Error).message}</div>;

    // Find the post with the postId
    const post = data.posts.find((post: any) => post._id === postId);

    if (!post) return <div>Post not found</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={'http://localhost:3000/' + post.author.profilePicture} alt="Author Avatar" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author.username}</p>
                    <p className="text-sm text-gray-500">{post.title}</p>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-700">{post.content}</p>
                {post.mediaUrl && (
                    <div className="mt-2">
                        <video height={200} width={300} src={'http://localhost:3000/' + post.mediaUrl} controls />
                    </div>
                )}
            </div>
            <Link to="/news" className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to News
            </Link>
        </div>
    );
};

export default SinglePost;
