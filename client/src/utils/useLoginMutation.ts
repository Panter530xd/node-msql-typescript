import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User } from "./useAuthData";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginUser = async (data: { email: string; password: string }) => {
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

    return await response.json();
  };

  const loginMutation = useMutation(
    async (data: { email: string; password: string }) => {
      const loginData = await loginUser(data);

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
        navigate("/");
        toast.success("User Success login");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return loginMutation;
};
