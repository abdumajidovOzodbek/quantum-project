import apiClient from "../../core/lib/apiClient";
import { token } from "../../profiles/hooks/useProfile";

export const addComment = async ({ content, postId }) => {
    const { data } = await apiClient.post('api/comments', { content, postId }, {
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });


    return data;
};

export const likePost = async (postId) => {
    const { data } = await apiClient.post(`api/posts/${postId}/like`);
    if(data.message.includes('liked')) return 'liked'
    
    return data
};
export const checkLiked = async (postId) => {
    const { data } = await apiClient.get(`api/posts/${postId}/checkliked`)

    if(data.message.includes('liked')) return 'liked'
};
export const viewPost = async (postId) => {
    const { data } = await apiClient.post(`api/posts/${postId}/view`);
    if(data.message.includes('viewed')) return 'viewed'
};