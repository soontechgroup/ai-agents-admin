import { createContext } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  created_at: string;
}

export interface BackendResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, full_name?: string) => Promise<void>;
  logout: () => void;
  resetMessages: () => void;
  error: string | null;
  success: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);