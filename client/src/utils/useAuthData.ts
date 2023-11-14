import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";

export type User = {
  id: number;
  email: string;
  accessToken?: string;
  role: string;
};

export const useAuthData = () => {
  const queryClient = useQueryClient();

  const isFetching = useIsFetching();

  return useQuery(
    ["user"],
    async (): Promise<User> => {
      try {
        const accessToken = queryClient.getQueryData<string>(["accessToken"]);
        console.log("ACCESS TOKEN", accessToken);
        if (!accessToken) {
          throw new Error("Access token not available");
        }
        const response = await fetch(
          "http://localhost:3000/api/protected-route",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401) {
          throw new Error("User not authenticated");
        }

        if (!response.ok) {
          throw new Error("User not authenticated");
        }

        const userData = await response.json();
        console.log("userData from server:", userData);
        return {
          accessToken: userData.user.accessToken || "",
          ...userData.user,
          role: userData.user.role,
        } as User;
      } catch (error) {
        if (isFetching) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return queryClient.fetchQuery(["accessToken"]);
        }

        console.error("Error fetching user data:", error);
        throw error;
      }
    },
    {
      retry: false,
      retryDelay: 1000,
      initialData: undefined,
    }
  );
};
