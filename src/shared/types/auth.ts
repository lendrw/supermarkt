export interface IAuth {
  accessToken: string;
  userId: number;
}

export interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  userId?: number;
  isLoading: boolean;
}