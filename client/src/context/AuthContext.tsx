import React, { createContext, useContext } from "react";
import Loading from "../componets/Loading";
import { User, useAuthData } from "../utils/useAuthData";
import { useLoginMutation } from "../utils/useLoginMutation";
import { useTokenRefresh } from "../utils/useTokenRefresh";
import { useLogout } from "../utils/useLogout";

type AuthContextType = {
  user: User | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuthData();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogout();
  useTokenRefresh(user, isLoading);

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
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
