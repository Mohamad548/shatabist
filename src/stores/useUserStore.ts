// stores/useUserStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {

  phone_number?: string;
  first_name?: string|undefined;
  last_name?: string|undefined;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-info',
      // ✅ فقط فیلدهایی که لازم داریم در localStorage ذخیره می‌شن
      partialize: (state) => ({
        user: state.user
          ? {
              phone_number: state.user.phone_number,
              first_name: state.user.first_name ?? null,
              last_name: state.user.last_name ?? null,
           
            }
          : null,
      }),
    }
  )
);
