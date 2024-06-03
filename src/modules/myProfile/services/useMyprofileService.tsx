import apiClient from "../../core/lib/apiClient";
import { token } from "../../profiles/hooks/useProfile";

export const uploadPicture = async (url) => {

    const formData = new FormData();
    formData.append('profilePicture', url);
    const { data } = await apiClient.put('api/profile-picture', formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        }
    });

    return data;
};
export const deleteProfilePicture = async () => {
    const { data } = await apiClient.delete('api/profile-picture', {
        headers: {
            Authorization: token,
        }
    });

    return data;
}

export const deleteAccount = async () => {
    const { data } = await apiClient.delete('api/profile', {
        headers: {
            Authorization: token,
        }

    }
    )
    return data

}
export const updateProfile = async (username) => {
    const { data } = await apiClient.put('api/profile',{username}, {
        headers: {
            Authorization: token,
        }

    }
    )
    return data
}