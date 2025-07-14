import { create } from 'zustand';
import { getUser } from '@/actions/get-user';

export const useUserStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    const { user } = await getUser();
    set({ user });
  },
}));