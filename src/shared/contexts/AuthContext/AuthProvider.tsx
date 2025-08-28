import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthService } from "../../services/api/auth/AuthService";
import { AuthContext } from "./AuthContext";

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";
const LOCAL_STORAGE_KEY__USER_ID = "APP_USER_ID";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const savedUserId = localStorage.getItem(LOCAL_STORAGE_KEY__USER_ID);

    if (token) setAccessToken(token);
    if (savedUserId) setUserId(Number(savedUserId));

    setIsLoading(false);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.login(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.accessToken);
      setAccessToken(result.accessToken);

      if (result.userId) {
        setUserId(result.userId);
        localStorage.setItem(LOCAL_STORAGE_KEY__USER_ID, String(result.userId)); // 🔑 salva também o userId
      }
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY__USER_ID); // 🔑 limpa também
    setAccessToken(undefined);
    setUserId(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
