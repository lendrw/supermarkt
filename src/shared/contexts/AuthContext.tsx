/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";
import type { IUser, ILoginData } from "../services/api/auth/AuthService";

interface IAuthContext {
  user: IUser | null;
  login: (data: ILoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = AuthService.getLoggedUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (data: ILoginData) => {
    const result = await AuthService.login(data);
    if (!(result instanceof Error)) {
      setUser(result);
    } else {
      throw result;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
