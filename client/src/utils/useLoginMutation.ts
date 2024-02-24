import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
=======
import toast from "react-hot-toast";
import { User } from "./useAuthData";
>>>>>>> 3e5a84627112bc37b0e696c6d2845fca6b87b760
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

<<<<<<< HEAD
  const loginUser = async (formData: { email: string; password: string }) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
=======
  const allowedRolesAdmin = ["admin"];
  const allowedRolesUser = ["user"];

  const loginUser = async (data: { email: string; password: string }) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/login`, {
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
>>>>>>> 3e5a84627112bc37b0e696c6d2845fca6b87b760
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

<<<<<<< HEAD
    return response.json();
  };

  return useMutation<
    { email: string; id: string; role: string; accessToken: string },
    string,
    { email: string; password: string }
  >({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      localStorage.setItem("accessToken", user.accessToken);
      navigate("/dashboard");
    },
  });
=======
  return loginMutation;
>>>>>>> 3e5a84627112bc37b0e696c6d2845fca6b87b760
};
