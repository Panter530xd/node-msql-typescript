import React, { createContext, useContext } from "react";
import { User, useAuthData } from "../utils/useAuthData";
import { useLoginMutation } from "../utils/useLoginMutation";
import { useLogout } from "../utils/useLogout";
import { useTokenRefresh } from "../utils/useTokenRefresh";
import Loading from "../componets/Loading";

type AuthContextType = {
  user: User | null | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loginMutation = useLoginMutation();
  const { data: user, isLoading } = useAuthData();
  const logoutMutation = useLogout();
  useTokenRefresh();

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
        await logoutMutation.mutateAsync();
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
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
  console.log("Context:", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
