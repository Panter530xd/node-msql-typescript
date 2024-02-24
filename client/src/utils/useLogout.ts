import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> 3e5a84627112bc37b0e696c6d2845fca6b87b760
import toast from "react-hot-toast";
import { useUser } from "./useUser";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { data: user } = useUser();
  console.log("User", user);
  const accessToken = localStorage.getItem("accessToken");
  const logoutFetch = async () => {
    const response = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
=======

  const logoutFetch = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
>>>>>>> 3e5a84627112bc37b0e696c6d2845fca6b87b760
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };

  const logoutMutation = useMutation({
    mutationFn: logoutFetch,
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.setQueryData(["user"], null);
      console.log("QUERY", queryClient.getQueryData(["user"]));

      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return logoutMutation;
};
