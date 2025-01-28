import { createContext, ReactNode, useContext } from "react";
import { IUserLoginDTO, IUserRegisterDTO } from "../types/User";
import { axiosInstance } from "../axios";
import { useCurrentUserStore } from "../store/currentUserStore";

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
    try {
      await axiosInstance.post("trainer", registerDTO);
      return await login({
        email: registerDTO.email,
        password: registerDTO.password,
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const login = async (loginDTO: IUserLoginDTO) => {
    try {
      const { data } = await axiosInstance.post("/trainer/login", loginDTO);
      setCurrentUser(data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    clearCurrentUser();
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
