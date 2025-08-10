import { Mock } from "../axios-config";


interface IUser {
  id: number;
  email: string;
  password: string;
  accessToken: string;
}

interface IAuth {
  accessToken: string;
  userId: number;
}

const login = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Mock.get<IUser[]>(`/users?email=${email}&password=${password}`);

    if (data.length > 0) {
      const user = data[0];
      return {
        accessToken: user.accessToken,
        userId: user.id,
      };
    }

    return new Error('Usuário ou senha inválidos.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

const logout = (): void => {
  localStorage.removeItem('APP_ACCESS_TOKEN');
};

export const AuthService = {
    login,
    logout
};