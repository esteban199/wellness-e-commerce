import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      setAuth: (user, accessToken) => set({ user, accessToken }),

      clearAuth: () => set({ user: null, accessToken: null }),

      isAdmin: () => get().user?.role === 'admin',
    }),
    { name: 'wcw-auth' }
  )
);
