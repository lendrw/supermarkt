import type { IAuth } from "../../../types";
import { Mock } from "../axios-config";
import { safeRequest } from "../../../utils/safeRequest";

const login = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  const data = await safeRequest(
    () => Mock.get<IAuth>(`/users?email=${email}&password=${password}`),
    "Login"
  );

  if (!data) return new Error("Wrong email or password.");

  try {
    return data.data;
  } catch {
    return new Error("Login error.");
  }
};

const register = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  const data = await safeRequest(
    () => Mock.post<IAuth>("/users", { email, password }),
    "Register"
  );

  if (!data) return new Error("Unexpected registration error.");

  try {
    return data.data;
  } catch {
    return new Error("Registration error.");
  }
};

const logout = (): void => {
  localStorage.removeItem("APP_ACCESS_TOKEN");
};

export const AuthService = {
  login,
  logout,
  register,
};
