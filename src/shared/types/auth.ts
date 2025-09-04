export interface IAuth {
  accessToken: string;
  userId: number;
}

export interface IAuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: IAuth) => void;
  logout: () => void;
  userId?: number;
}
