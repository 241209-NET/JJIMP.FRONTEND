import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrentUserStoreState {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearCurrentUser: () => void;
}

export const useCurrentUserStore = create<CurrentUserStoreState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: "currentUserStorage",
    }
  )
);
