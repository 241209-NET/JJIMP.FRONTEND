import { create } from "zustand";

interface UserStoreState {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: number, updatedFields: Partial<User>) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedFields) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? ({ ...user, ...updatedFields } as User) : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
