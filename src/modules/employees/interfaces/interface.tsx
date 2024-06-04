import { ReactNode } from "react";

export interface Post {
    _id: string;
    content: string;
    author: {
      _id: ReactNode;
      username: string;
      profilePicture: string;
    };
    title: string;
    mediaUrl: string;
    likesCount: number;
    viewsCount:number;
    comments: Array<any>;
    type: string;
  }
export interface VideoModalProps {
    post: Post | null;
    isOpen: boolean;
    onRequestClose: () => void;
    videoRef: React.RefObject<HTMLVideoElement>;
  }
  