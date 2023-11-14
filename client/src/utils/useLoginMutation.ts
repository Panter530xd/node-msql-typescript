import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User } from "./useAuthData";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import useLogin from "./useLogin";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loginUser = useLogin();

  const cookies = new Cookies(null, { path: "/" });
  console.log("Cookies", cookies.getAll());

  const loginMutation = useMutation(
    async (data: { email: string; password: string }) => {
      const loginData = await loginUser(data);

      const newAccessToken = loginData.accessToken;

      if (!newAccessToken) {
        throw new Error("Access token not found in login response");
      }

      queryClient.setQueryData<string>(["accessToken"], newAccessToken);

      return loginData;
    },
    {
      onSuccess: (loginData) => {
        queryClient.setQueryData<User | undefined>(["user"], {
          ...loginData,
          accessToken: loginData.accessToken,
        });
        navigate("/");
        toast.success("User successfully logged in");
        queryClient.invalidateQueries({
          queryKey: ["accessToken"],
        });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  const accessToken = cookies.get("access_token");
  console.log("Cokies", accessToken);

  useQuery<string>(["accessToken"], { initialData: accessToken });

  return loginMutation;
};
