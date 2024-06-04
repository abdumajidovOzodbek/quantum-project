import React, { useState } from 'react';
import { useAuthStore } from '../states/useAuthStore';
import { NavLink, useNavigate } from 'react-router-dom';
import ErrorModal from '../../Errors/error';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data:any = await register(username, password);
      if (data.token) {
        navigate('/videos')
      }
    } catch (error:any) {
      console.log(error.response.data);

      setErrorMessage(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {errorMessage && (<ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />)}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="text"
              type="text"
              autoComplete="text"
              required
              className="mt-1 p-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 p-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            <NavLink className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              to={'/login'}>
              or login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
