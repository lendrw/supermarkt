import { createContext } from "react";
import type { IAuthContextData } from "../../types";

export const AuthContext = createContext({} as IAuthContextData);