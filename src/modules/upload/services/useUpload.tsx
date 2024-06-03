import apiClient from "../../core/lib/apiClient";
import { token } from "../../profiles/hooks/useProfile";

export const uploadNews = async (obj) => {
const formData=new FormData()
formData.append('title',obj.title)
formData.append('content',obj.content)
formData.append('media',obj.media)
formData.append('type','news')

    const { data } = await apiClient.post('api/posts', formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    });

    return data;
};

export const uploadVideo = async (obj) => {
    const formData=new FormData()
    formData.append('title',obj.title)
    formData.append('media',obj.media)
    formData.append('type','video')
    formData.append('content','video')
    
        const { data } = await apiClient.post('api/posts', formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        });
    
        return data;
    };