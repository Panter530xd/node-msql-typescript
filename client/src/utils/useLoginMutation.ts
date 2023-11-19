import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User } from "./useAuthData";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const allowedRolesAdmin = ["admin"];
  const allowedRolesUser = ["user"];

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

      return loginData;
    },
    {
      onSuccess: (loginData) => {
        queryClient.setQueryData<User | undefined>(["user"], {
          ...loginData,
        });

        toast.success("User successfully logged in");
        if (loginData && loginData.role) {
          const userRoles: string[] = loginData.role.split(",");
          console.log("USER Roles", userRoles);

          if (userRoles.some((role) => allowedRolesAdmin.includes(role))) {
            navigate("/dashboard");
          } else if (
            userRoles.some((role) => allowedRolesUser.includes(role))
          ) {
            navigate("/");
          }
        }
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return loginMutation;
};
