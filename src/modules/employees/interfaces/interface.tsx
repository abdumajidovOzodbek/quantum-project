export interface Post {
    _id: string;
    content: string;
    author: {
      username: string;
      profilePicture: string;
    };
    title: string;
    mediaUrl: string;
    likesCount: number;
    comments: Array<any>;
    type: string;
  }
export interface VideoModalProps {
    post: Post | null;
    isOpen: boolean;
    onRequestClose: () => void;
    videoRef: React.RefObject<HTMLVideoElement>;
  }
  