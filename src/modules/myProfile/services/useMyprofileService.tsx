import apiClient from "../../core/lib/apiClient";
import { token } from "../../profiles/hooks/useProfile";

export const uploadPicture = async (url: string | Blob) => {

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

export const deletePostByid = async (id: string) => {
    const { data } = await apiClient.delete('api/posts/' + id, {
        headers: {
            Authorization: token,
        }

    }
    )
    console.log(id);

    return data

}
export const updateProfile = async (username: string) => {
    const { data } = await apiClient.put('api/profile', { username }, {
        headers: {
            Authorization: token,
        }

    }
    )
    return data
}
export const UpdateByPostId = async (id: string, newData: { title: string; content?: string; }) => {
    const { data } = await apiClient.put('api/posts/' + id,  newData , {
        headers: {
            Authorization: token,
        }

    }
    )
    return data

}