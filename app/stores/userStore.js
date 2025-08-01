import { create } from 'zustand';
import { getUser } from '@/actions/get-user';

export const useUserStore = create((set) => ({
  user: null,
  error: null,

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),

  fetchUser: async () => {
    const { user, error } = await getUser();
    if (error) {
      console.error("Error fetching user:", error);
      set({ error });
      return;
    }
    set({ user });
  },
}));