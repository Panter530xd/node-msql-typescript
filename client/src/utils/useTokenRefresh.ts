import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User } from "./useAuthData";

export const useTokenRefresh = (user: User | undefined, isLoading: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenRefresh = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/refresh",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.accessToken) {
            const newAccessToken = data.accessToken;

            queryClient.setQueryData(["user"], {
              accessToken: newAccessToken,
            });
          } else {
            console.error("Token refresh failed: Invalid data format", data);
          }
        } else if (response.status === 401) {
          console.error(
            "Token refresh failed: Unauthorized",
            response.statusText
          );
        } else {
          console.error(
            "Token refresh failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    console.log("USER", user);

    if (isLoading) {
      return;
    }

    if (user && !isLoading) {
      handleTokenRefresh().then(() => {
        navigate("/");
      });
    } else if (!user && !isLoading) {
      navigate("/login");
    }

    handleTokenRefresh();
  }, [user, navigate, isLoading, queryClient]);
};
