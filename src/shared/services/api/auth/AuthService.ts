import { Api } from "../axios-config";

export interface ILoginData {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export const AuthService = {
  login: async (credentials: ILoginData): Promise<IUser | Error> => {
    try {
      const { data } = await Api.post("/auth/login", credentials);
      localStorage.setItem("authUser", JSON.stringify(data));
      return data;
    } catch (error: unknown) {
      console.error("Erro ao fazer login:", error);
      if (error instanceof Error) {
        return new Error(error.message || "Erro ao fazer login.");
      }
      return new Error("Erro ao fazer login.");
    }
  },

  logout: () => {
    localStorage.removeItem("authUser");
  },

  getLoggedUser: (): IUser | null => {
    const data = localStorage.getItem("authUser");
    if (!data) return null;
    return JSON.parse(data);
  },
};
