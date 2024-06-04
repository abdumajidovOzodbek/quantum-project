import { useQuery } from "@tanstack/react-query";
import apiClient from "../../core/lib/apiClient";
import { token } from "../../profiles/hooks/useProfile";

const fetchUserPostsById = async (id: number) => {
    try {
        const { data } = await apiClient.get(`api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
export const useUserPostsById = (id: number) => {
    return useQuery({
        queryKey: ['api/posts', id],
        queryFn: () => fetchUserPostsById(id)
    });
};