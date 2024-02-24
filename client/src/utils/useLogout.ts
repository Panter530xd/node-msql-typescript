import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutFetch = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
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
