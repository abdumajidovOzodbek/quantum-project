import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './auth/components/Login';
import NewsList from './employees/components/NewsList';
import { useAuthStore } from './auth/states/useAuthStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './auth/components/SignUpForm';
import Layout from './core/components/layout'
import SinglePost from './employees/components/NewsSinglePost';
import VideoList from './employees/components/VideoList';
import Profiles from './profiles/components/Profile';
import UserProfile from './profiles/components/UserProfile';
import ChatWithUser from './chat/components/chatWithUserComp';
import Chat from './chat/components/chat';
import MyProfile from './myProfile/components/myProfile';
import Upload from './upload/components/upload';
import NewPost from './upload/components/uploadnewPost';
import NewVideo from './upload/components/uploadVideo';
import MyNews from './myProfile/components/mynewsPosts';
import MyVideos from './myProfile/components/myVideos';
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Layout />}>
            <Route path='news' element={<NewsList />} />
            <Route path='profile/:userId' element={<MyProfile />} />
            <Route path='upload' element={<Upload />} />
            <Route path='upload-news' element={<NewPost />} />
            <Route path='upload-video' element={<NewVideo />} />
            <Route path='my-new-posts' element={<MyNews />} />
            <Route path='my-videos' element={<MyVideos />} />
            <Route path='videos' element={<VideoList />} >
              <Route path='users' element={<Profiles />} />
            </Route>
            <Route path='users' element={<Profiles />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/news/:postId" element={<SinglePost />} />
            <Route path="/chat" element={<Chat />} >
              <Route path="/chat/:userId" element={<ChatWithUser />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
