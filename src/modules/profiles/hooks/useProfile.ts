import { useQuery } from "@tanstack/react-query";
import apiClient from "../../core/lib/apiClient";
export const token = localStorage.getItem('token')
export const host = 'https://quantum-project-a6c6366fa11f.herokuapp.com/'

const fetchUserById = async (id: number) => {
    try {
        const { data } = await apiClient.get(`api/user/${id}`, {
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
const fetchownprofileById = async (id: number) => {
    try {
        const { data } = await apiClient.get(`api/user/${id}`, {
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

export const useUserById = (id: number) => {
        return useQuery({
        queryKey: ['api/user', id],
        queryFn: () => fetchUserById(id)
    });
};
export const useToGetprofile = (id: number) => {  
    return useQuery({
        queryKey: ['api/user', id],
        queryFn: () => fetchownprofileById(id)
    });
};
const fetchAllUsers = async () => {
    try {
        const { data } = await apiClient.get('api/users', {
            headers: {
                Authorization: token
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const useAllUsers = () => {
    return useQuery({ queryKey: ['api/users'], queryFn: fetchAllUsers });
};