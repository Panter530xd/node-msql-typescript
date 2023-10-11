import React, { createContext, useContext, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../componets/Loading";

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<User | null>(
    ["user"],
    async () => {
      const response = await fetch(
        "http://localhost:3000/api/protected-route",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("User not authenticated");
      }

      const data = await response.json();
      return data.user;
    },
    {
      retry: false, // Disable automatic retries
      retryDelay: 1000, // Optional: Set a delay between retries
    }
  );

  const loginMutation = useMutation(
    async (data: { email: string; password: string }) => {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    }
  );

  const isEffectTriggered = useRef(false);

  useEffect(() => {
    if (!user && !isLoading && !isEffectTriggered.current) {
      toast.error("User not authenticated. Redirecting to login.");
      navigate("/login");
      isEffectTriggered.current = true;
    } else if (!isLoading && !isEffectTriggered.current) {
      navigate("/");
      isEffectTriggered.current = true;
    }
  }, [user, isLoading, navigate]);

  const contextValue: AuthContextType = {
    user,
    login: async (email: string, password: string) => {
      try {
        await loginMutation.mutateAsync({ email, password });
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    logout: async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/logout", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message || "Logout successful");
          queryClient.invalidateQueries(["user"]);
          navigate("/login");
        } else {
          const data = await response.json();
          toast.error(data.message || "Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
        toast.error("Logout failed");
      }
    },
  };

  return isLoading ? (
    <Loading />
  ) : (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
