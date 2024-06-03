import { useQuery } from '@tanstack/react-query';
import apiClient from '../../core/lib/apiClient';

const fetchPosts = async () => {
    const { data } = await apiClient.get('api/posts');
    return data;
};

export const usePosts = () => {
    return useQuery({
        queryKey: ['api/posts'],
        queryFn: fetchPosts,
    });
};
const fetchCommentById = async (id: any) => {
    try {
        const { data } = await apiClient.get(`api/posts/${id}/comments`);

        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export const useCommentsById = (id: any) => {
    return useQuery({
        queryKey: ['posts/:postId/comments', id],
        queryFn: () => fetchCommentById(id)
    });
};

