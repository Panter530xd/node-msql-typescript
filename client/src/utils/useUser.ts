import { useQuery } from "@tanstack/react-query";

export type User = {
  id: number;
  email: string;
  accessToken?: string;
  role: string;
};

export function useUser() {
  const getUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/api/verify", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.message ?? "User not authenticated!");
    }

    return response.json();
  };
  return useQuery<User, Error>({
    queryFn: getUserData,
    queryKey: ["user"],
  });
}
