import React, { useRef, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import VideoModal from './VideoModal';
import { Post } from '../interfaces/interface';
import { host } from '../../profiles/hooks/useProfile';

const VideoReels: React.FC = () => {
  const { data, error, isLoading } = usePosts();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-600 text-center font-semibold text-xl">Error: {error.message}</div>;

  const videoPosts = data?.posts.filter((post: Post) => post.type === 'video') || [];

  const togglePlay = (postId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (playingId === postId) {
      if (videoRefs.current[postId].paused) {
        videoRefs.current[postId].play();
      } else {
        videoRefs.current[postId].pause();
      }
    } else {
      if (playingId) {
        videoRefs.current[playingId].pause();
      }
      setPlayingId(postId);
      videoRefs.current[postId].play();
    }
  };

  const openModal = (post: Post, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">Explore Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoPosts.map((post: Post) => (
          <div key={post._id} className="bg-black rounded-xl overflow-hidden transform transition-all hover:scale-105 relative" onClick={(event) => openModal(post, event)}>
            <video
              ref={(video) => (videoRefs.current[post._id] = video!)}
              className="w-full h-full"
              src={host + post.mediaUrl}
              onClick={(event) => togglePlay(post._id, event)}
            ></video>
            <div className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black">
              <div className="flex items-center mb-2">
                <img className="h-8 w-8 rounded-full mr-3" src={host + post.author.profilePicture} alt="Author Avatar"></img>
                <p className="text-sm truncate">{post.author.username}</p>
              </div>
              <p className="text-sm font-semibold mb-2">{post.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> {post.likesCount}
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faComment} className="mr-1" /> {post.comments.length}
                </span>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <button className="text-white" onClick={(event) => togglePlay(post._id, event)}>
                {playingId === post._id && !videoRefs.current[post._id].paused ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <VideoModal
        post={selectedPost}
        isOpen={selectedPost !== null}
        onRequestClose={closeModal}
        videoRef={videoRefs.current[selectedPost?._id || '']}
      />
    </div>
  );
};

export default VideoReels;
