import { create } from "zustand";

export const useChatstore = create((set) => ({
    id: null,
    sendData: async (id: number) => {
        set({ id: id })
    },
    // logout: () => set({ user: null }),
    // register: async (username: string, password: string) => {
    //   const loggedInUser = await register(username, password)
    //   set({ user: loggedInUser });
    // }
}));