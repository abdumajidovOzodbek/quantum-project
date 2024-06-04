import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons'; // Import the faEye icon
import { VideoModalProps } from '../interfaces/interface';
import { addComment, checkLiked, deleteComment, viewPost } from '../services/postApi'; // Import the getViewCount function
import { useCommentsById } from '../hooks/usePosts';
import { host, senderId, useUserById } from '../../profiles/hooks/useProfile';
import { likePost } from '../services/postApi';

const VideoModal: React.FC<VideoModalProps> = ({ post, isOpen, onRequestClose, videoRef }) => {
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const id = post?._id;
  const { data } = useCommentsById(id);
  const user: any = useUserById(senderId);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data) {
      setComments(data.comments);
      setLikeCount(post?.likesCount)
    }
    (async () => {
      try {
        const like = await checkLiked(post._id);

        if (like === 'liked') {
          setLiked(true);

        }
      } catch (error) {
        console.error('Error liking the post', error);
      }
    })()
    if (isOpen && post?._id) {
      (async () => {
        try {
          await viewPost(post._id);
          if (post.viewsCount == 0) {
            setViewCount(1);
          } {
            setViewCount(post.viewsCount); // Set the view count in the state
          }
        } catch (error) {
          console.error('Error handling view count', error);
        }
      })();
    }
  }, [data, isOpen]);

  if (!post) return null;

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        content: comment,
        postId: post._id,
        author: {
          _id: senderId,
          profilePicture: user.data.user.profilePicture,
          username: user.data.user.username,
        },
      };
      setComments([...comments, newComment]);
      setComment('');
      addComment({ content: newComment.content, postId: newComment.postId });
    }
  };

  const handleLike = async () => {
    try {
      await likePost(post._id);
      setLikeCount(post.likesCount + 1)
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking the post', error);
    }
  };

  const deleteCommentById = async ({ commentId, postId }) => {
    await deleteComment({ commentId, postId })
    await setComments(comments.filter((comment) => comment._id !== commentId))
  }
  const renderComments = () => {
    return comments.map((comment, index) => (

      <div key={index} className="p-2 border-b border-gray-300 flex items-start relative">
        <img
          src={`${host}${comment?.author.profilePicture}`}
          alt="Author Avatar"
          className="h-8 w-8 rounded-full mr-2 object-cover"
        />
        <div>
          {post.author._id === comment.author._id ? (
            <p className="rounded-md text-sm font-semibold text-gray-900 bg-black text-white">{comment.author.username}</p>
          ) : (
            <p className="text-sm font-semibold text-gray-900">{comment.author.username}</p>
          )}
          <p className="text-sm text-gray-800">{comment.content}</p>
          {post.author._id === senderId && (
            <button
              onClick={() => deleteCommentById({ commentId: comment._id, postId: post._id })}
              className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    ));
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60"
      ariaHideApp={false}
    >
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto overflow-hidden flex flex-col md:flex-row h-[80vh]">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 z-10"
          onClick={onRequestClose}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="relative flex flex-col h-1/2 md:h-full w-full md:w-[38%] bg-black">
          <video
            ref={videoRef}
            className="h-full w-full"
            src={host + post.mediaUrl}
            controls
            autoPlay
          ></video>
        </div>
        <div className="w-full md:w-[62%] border-t md:border-t-0 md:border-l border-gray-300 flex flex-col h-1/2 md:h-full">
          <div className="p-4 text-gray-900 flex-grow overflow-y-auto">
            <div className="flex items-center mb-4 p-4 text-gray-900 shadow-md bg-gray-100 w-full">
              <img className="h-12 w-12 rounded-full object-cover mr-4" src={host + post.author.profilePicture} alt="Author Avatar" />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-900 truncate">{post.author.username}</p>
                <p className="text-sm text-gray-600">{post.title}</p>
              </div>
              <div className="flex items-center ml-4 space-x-2">
                <button
                  onClick={handleLike}
                  className={`text-gray-600 hover:text-gray-800 ${liked && 'opacity-90 cursor-not-allowed'}`}
                  disabled={liked}
                >
                  <FontAwesomeIcon icon={faThumbsUp} size="lg" className={liked ? 'text-blue-500' : ''} />
                  <span>{likeCount}</span>
                </button>


                <div className="text-gray-600 flex items-center space-x-1">
                  <FontAwesomeIcon icon={faEye} size="lg" />
                  <span>{viewCount}</span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mt-4">Comments</h3>
            <div className="space-y-2">
              {renderComments()}
            </div>
          </div>
          <form onSubmit={handleCommentSubmit} className="p-4 bg-white border-t border-gray-300">
            <input
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
