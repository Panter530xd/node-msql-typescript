import { useQuery } from "@tanstack/react-query";

export type User = {
  id: number;
  email: string;
  accessToken?: string;
};
export const useAuthData = () => {
  const { data: user, isLoading } = useQuery<User>(
    ["user"],
    async () => {
      try {
        const userResponse = user as User;
        const accessToken = userResponse?.accessToken || "";

        if (!accessToken) {
          console.error("Access token not available");
          throw new Error("User not authenticated");
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

        if (!response.ok) {
          throw new Error("User not authenticated");
        }

        const userData = await response.json();
        console.log("Data", userData);

        return { accessToken, ...userData.user } as User;
      } catch (error) {
        console.error("Error during user query:", error);
        throw error;
      }
    },
    {
      retry: false,
      retryDelay: 1000,
      initialData: undefined,
    }
  );
  return { user, isLoading };
};
