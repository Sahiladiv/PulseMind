import { createContext } from "react";

interface User {
  name: string;
  role: "patient" | "doctor";
}

interface AuthContextType {
  user: User | null;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logoutUser: () => {},
});
