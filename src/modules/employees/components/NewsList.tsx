import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { usePosts } from '../hooks/usePosts';
import { host } from '../../profiles/hooks/useProfile';
const NewsList: React.FC = () => {
    const { data, error, isLoading }: any = usePosts();

    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        );
      }
      
    if (error) return <div>Error: {(error as Error).message}</div>;

    // Filter the data to show only posts with type 'news'
    const newsPosts = data.posts.filter((post: any) => post.type === 'news');

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">News</h1>
            <ul className="divide-y divide-gray-200">
                {newsPosts.map((post: any) => (
                    <li key={post._id} className="py-4">
                        <Link to={`/news/${post._id}`} className="flex items-center"> {/* Use Link to navigate to single post page */}
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={host + post.author.profilePicture} alt="Author Avatar" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{post.author.username}</p>
                                <p className="text-sm text-gray-500">{post.title}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
