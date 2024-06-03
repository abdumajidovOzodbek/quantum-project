import apiClient from "../../core/lib/apiClient";
import { token } from "../../profiles/hooks/useProfile";

export const addComment = async ({ content, postId }) => {
    console.log(token);
    const { data } = await apiClient.post('api/comments', { content, postId }, {
        method:'post',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    
    
    return data;
};