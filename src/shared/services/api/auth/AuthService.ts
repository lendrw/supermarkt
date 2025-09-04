import type { IAuth } from "../../../types";
import { Mock } from "../axios-config";

const login = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Mock.get<IAuth>(
      `/users?email=${email}&password=${password}`
    );
    return data;
  } catch (error: unknown) {
    console.error(error);

    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (err.response?.status === 401) {
        return new Error("Invalid email or password.");
      }

      return new Error(err.response?.data?.message || "Login error.");
    }

    return new Error("Unexpected login error.");
  }
};

const register = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Mock.post<IAuth>("/users", { email, password });
    return data;
  } catch (error: unknown) {
    console.error(error);

    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as {
        response?: { status?: number; data?: { message?: string } };
      };

      if (err.response?.status === 409) {
        return new Error("Email is already registered.");
      }

      return new Error(err.response?.data?.message || "Registration error.");
    }

    return new Error("Unexpected registration error.");
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
