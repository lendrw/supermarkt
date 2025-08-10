// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../shared/contexts";
import type { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/login" />;
};
