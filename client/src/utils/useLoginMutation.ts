import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginUser = async (formData: { email: string; password: string }) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

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
};
