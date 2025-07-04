"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  AuthContext,
  type User,
  type BackendResponse,
  type LoginResponse,
} from "../../lib/auth-context";
import { API_ENDPOINTS } from "../../lib/api-config";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(API_ENDPOINTS.auth.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: BackendResponse<User> = await response.json();
        setUser(data.data);
        // Set cookie for middleware
        document.cookie = `token=${token}; path=/; max-age=86400`;
      } else {
        localStorage.removeItem("token");
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    } catch {
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data: BackendResponse<LoginResponse> = await response.json();

      if (!response.ok || data.code !== 200) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.data.access_token);
      document.cookie = `token=${data.data.access_token}; path=/; max-age=86400`;
      await checkAuth();
      setSuccess(data.message || "Successfully logged in!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    full_name?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Only include full_name if it's not empty
      const payload: any = { username, email, password };
      if (full_name && full_name.trim()) {
        payload.full_name = full_name.trim();
      }

      const response = await fetch(API_ENDPOINTS.auth.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: BackendResponse<User> = await response.json();

      if (!response.ok || data.code !== 200) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(data.message || "Account created successfully! Please login.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    setSuccess("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        resetMessages,
        error,
        success,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
