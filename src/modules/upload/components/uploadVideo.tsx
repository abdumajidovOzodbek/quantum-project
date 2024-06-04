import React, { useState, ChangeEvent, FormEvent } from 'react';
import { senderId } from '../../auth/states/useAuthStore';
import { uploadNews, uploadVideo } from '../services/useUpload';
import ErrorModal from '../../Errors/error';

interface ImageData {
    url: string;
    name: string;
    preview: boolean;
    size: string;
}

const NewVideo: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [title, setTitle] = useState('');
    const [selectedPicture, setSelectedMedia] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedMedia(event.target.files[0])

        const files = Array.from(event.target.files || []).map((file: File) => ({
            url: URL.createObjectURL(file),
            name: file.name,
            preview: ['jpg', 'jpeg', 'png', 'gif'].includes(file.name.split('.').pop()!.toLowerCase()),
            size: file.size > 1024 ? file.size > 1048576 ? Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb' : file.size + 'b'
        }));
        setImages(files);
    };


    const handlePost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const postData = {
            title,
            media: selectedPicture,
            author: senderId
        };


        try {
            await uploadVideo(postData)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }


    };

    return (
        <div className="bg-white shadow p-4 py-8">
            {errorMessage && (
                <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />)}
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">New Post</div>
            <form onSubmit={handlePost}>
                <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                    <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck={false} placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <div className="icons flex text-gray-500 m-2">
                        <label id="select-image">
                            <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <input hidden type="file" accept="video/mp4,video/mpeg,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-ms-wmv" multiple onChange={handleFileChange} required />
                        </label>
                    </div>

                    <div id="preview" className="my-4 flex">
                        {images.map((image, index) => (
                            <div className="relative w-32 h-32 object-cover rounded" key={index}>
                                {image.preview ? (
                                    <img src={image.url} className="w-32 h-32 object-cover rounded" alt={image.name} />
                                ) : (
                                    <svg className="fill-current w-32 h-32 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                    </svg>
                                )}
                                <button onClick={() => setImages(images.filter((_, i) => i !== index))} className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"><span className="mx-auto">×</span></button>
                                <div className="text-xs text-center p-2">{image.size}</div>
                            </div>
                        ))}
                    </div>

                    <div className="buttons flex justify-end">
                        <button type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default NewVideo;
