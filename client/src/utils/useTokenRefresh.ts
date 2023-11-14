import { useQueryClient } from "@tanstack/react-query";

export const useTokenRefresh = () => {
  const queryClient = useQueryClient();

  const handleTokenRefresh = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/refresh", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        if (data && data.accessToken) {
          const newAccessToken = data.accessToken;
          const roleUser = data.role;
          const emailUser = data.email;
          console.log("New", newAccessToken);

          queryClient.setQueryData(["user"], {
            accessToken: newAccessToken,
            role: roleUser,
            email: emailUser,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };

  handleTokenRefresh();
};
