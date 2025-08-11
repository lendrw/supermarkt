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

const login = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Mock.get<IUser[]>(
      `/users?email=${email}&password=${password}`
    );

    if (data.length > 0) {
      const user = data[0];
      return {
        accessToken: user.accessToken,
        userId: user.id,
      };
    }

    return new Error("Invalid email or password.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Login error."
    );
  }
};

const register = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data: existingUsers } = await Mock.get<IUser[]>(
      `/users?email=${email}`
    );
    if (existingUsers.length > 0) {
      return new Error("Email is already registered.");
    }

    const newUser: Omit<IUser, "id"> = {
      email,
      password,
      accessToken: crypto.randomUUID(),
    };

    const { data: createdUser } = await Mock.post<IUser>("/users", newUser);

    return {
      accessToken: createdUser.accessToken,
      userId: createdUser.id,
    };
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Registration error."
    );
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
