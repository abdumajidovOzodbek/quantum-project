import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './auth/components/Login';
import NewsList from './employees/components/NewsList';
import { useAuthStore } from './auth/states/useAuthStore';
import Button from './core/design-system/Button';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './auth/components/SignUpForm';
import Layout from './core/components/layout'
import SinglePost from './employees/components/NewsSinglePost';
import VideoList from './employees/components/VideoList';
import Profiles from './profiles/components/Profile';
import UserProfile from './profiles/components/UserProfile';
import ChatWithUser from './chat/components/chatWithUserComp';
import Chat from './chat/components/chat';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { user, logout } = useAuthStore();
  return (
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Layout />}>
            <Route path='news' element={<NewsList />} />
            <Route path='videos' element={<VideoList />} />
            <Route path='profiles' element={<Profiles />} />
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
