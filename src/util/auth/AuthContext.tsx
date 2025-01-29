import { createContext, ReactNode, useContext } from "react";
import { IUserLoginDTO, IUserRegisterDTO } from "../types/User";

import { useCurrentUserStore } from "../store/currentUserStore";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export type AuthContextType = {
  id: number | null;
  name: string | null;
  setName: (name: string) => void;
  register: (registerDTO: IUserRegisterDTO) => Promise<boolean>;
  login: (loginDTO: IUserLoginDTO) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { currentUser, setCurrentUser, clearCurrentUser } =
    useCurrentUserStore();

  const register = async (registerDTO: IUserRegisterDTO) => {
    if (!registerDTO.name.trim() || !registerDTO.password.trim()) return false;
    try {
      const response = await axios.post<User>(
        `${baseURL}/api/User`,
        registerDTO
      );
      if (response.data) {
        setCurrentUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register error:", error);
      alert("Error creating user. Try a different username.");
      return false;
    }
  };

  const login = async (loginDTO: IUserLoginDTO) => {
    try {
      // Send login request to the backend
      const response = await axios.post<{ token: string; user: User }>(
        `${baseURL}/api/User/login`,
        loginDTO
      );

      if (response.data) {
        // Destructure the token and user
        const { token, user } = response.data;

        if (!token || !user) {
          throw new Error("Invalid login response");
        }

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Set the current user
        setCurrentUser(user);
        return true;
      }
      return false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error);
      alert(
        error.response?.data?.message ||
          "Invalid credentials or user not found."
      );
      return false;
    }
  };

  const logout = () => {
    clearCurrentUser();
    localStorage.removeItem("token");
    //refreshing app
    window.location.reload();
  };

  const setName = (name: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, name });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        id: currentUser?.id || null,
        name: currentUser?.name || null,
        setName,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
