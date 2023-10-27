// useLoginMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User } from "./useAuthData";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

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

      const loginData = await response.json();
      const accessToken = loginData.accessToken;

      if (!accessToken) {
        throw new Error("Access token not found in login response");
      }

      queryClient.setQueryData<User | undefined>(
        ["user"],
        (prev) => ({ ...prev, accessToken } as User)
      );

      return loginData;
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

  return loginMutation;
};
