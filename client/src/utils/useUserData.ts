import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type User = {
  id: number;
  email: string;
  accessToken?: string;
  role: string;
};

const fetchUserData = async (accessToken?: string): Promise<User> => {
  const response = await fetch("http://localhost:3000/api/protected-route", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || ""}`,
    },
  });

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
};

export const useUserData = (options?: UseQueryOptions<User, Error>) => {
  return useQuery<User, Error>(["user"], () => fetchUserData(), {
    ...options,
  });
};
