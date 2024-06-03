import apiClient from '../../core/lib/apiClient';

export const login = async (username: string, password: string) => {
  const { data } = await apiClient.post('auth/login', { username, password }); 
  console.log(
  data
  );
  
  localStorage.setItem('userId',data.userId)
  localStorage.setItem('token',data.token) 
  return data;
};
export const register = async (username: string, password: string) => {
  const { data } = await apiClient.post('auth/register', { username, password });
  localStorage.setItem('userId',data.userId)
  localStorage.setItem('token',data.token)
  return data;
};