// src/routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../shared/contexts";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Navigate to="/" /> : children;
};
