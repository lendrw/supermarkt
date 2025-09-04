import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { IAuth } from "../../types";

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";
const LOCAL_STORAGE_KEY__USER_ID = "APP_USER_ID";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const savedUserId = localStorage.getItem(LOCAL_STORAGE_KEY__USER_ID);

    if (token && savedUserId) {
      setAuth({
        accessToken: token,
        userId: Number(savedUserId),
      });
    }

    setIsLoading(false);
  }, []);

  const handleLogin = useCallback((authData: IAuth) => {
    localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, authData.accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY__USER_ID, String(authData.userId));
    setAuth(authData);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY__USER_ID);
    setAuth(null);
  }, []);

  const isAuthenticated = useMemo(() => !!auth, [auth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        userId: auth?.userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
