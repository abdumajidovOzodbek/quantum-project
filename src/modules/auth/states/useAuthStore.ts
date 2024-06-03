import create from 'zustand';
import { login, register } from '../services/authApi';
export const senderId: any = localStorage.getItem('userId');

interface AuthState {
  user: { _id: number; username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username: string, password: string) => {
    const loggedInUser = await login(username, password)
    set({ user: loggedInUser });
  },
  logout: () => set({ user: null }),
  register: async (username: string, password: string) => {
    const loggedInUser = await register(username, password)
    set({ user: loggedInUser });
  }
}));
