import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type User = {
  id: number;
  email: string;
  accessToken?: string;
  role: string;
};

export const useAuthData = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useQuery(
    ["user"],
    async (): Promise<User> => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/protected-route`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401) {
          queryClient.setQueryData(["user"], undefined);
          navigate("/login");
          return Promise.reject(new Error("User not authenticated"));
        }

        if (response.status === 403) {
          const refreshResponse = await fetch(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/refresh`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (refreshResponse.ok) {
            const refreshedData = await refreshResponse.json();
            queryClient.invalidateQueries(["user"]);
            return refreshedData.user;
          } else {
            queryClient.setQueryData(["user"], undefined);
            navigate("/login");
            return Promise.reject(new Error("Failed to refresh token"));
          }
        }

        if (!response.ok) {
          throw new Error("User not authenticated");
        }

        const userData = await response.json();
        console.log("userData from server:", userData);

        return {
          accessToken: userData.accessToken,
          ...userData.user,
          role: userData.user.role,
        } as User;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
    {
      retry: false, // Disable automatic retries
      retryDelay: 1000,
      initialData: undefined,
    }
  );
};
