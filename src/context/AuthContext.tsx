import { createContext, useState, useContext } from "react";
import { saveUser } from "../services/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  email: string;
  name: string;
  avatarUri: string;
};

type AuthUser = User & {
  password?: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: AuthUser) => {
    const safeUser: User = {
      email: userData.email,
      name: userData.name,
      avatarUri: userData.avatarUri,
    };

    setUser(safeUser);
    saveUser(safeUser);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("app:v1:user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
