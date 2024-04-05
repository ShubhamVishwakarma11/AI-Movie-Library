import { loginController, signupController } from "@/api/auth";
import { ReactElement, createContext, useState } from "react";

interface TAuthContext {
  email: string;
  token: string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
}

const initAuthContext = {
  email: "",
  token: "",
  isAuthenticated: false,
  login: () => {
    return Promise.resolve();
  },
  signup: () => {
    return Promise.resolve();
  },
  logout: () => {},
};

export const AuthContext = createContext<TAuthContext>(initAuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const token = await loginController(email, password);
      if (token) {
        setIsAuthenticated(true);
        setToken(token);
        setEmail(email);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setToken("");
      setEmail("");
    }
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const token = await signupController(email, password, confirmPassword);
      if (token) {
        setIsAuthenticated(true);
        setToken(token);
        setEmail(email);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setToken("");
      setEmail("");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ token, email, login, signup, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
