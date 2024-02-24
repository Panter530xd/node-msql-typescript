import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ZodError, z } from "zod";

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface ErrorMessages {
  password?: string;
  confirmPassword?: string;
}

const RessetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters" }),
});

export default function ResetPassword() {
  const { token, id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
  console.log(errorMessages);

  const mutation = useMutation(
    async (data: FormValues) => {
      const validatedData = RessetPasswordSchema.parse(data);

      const requestData = {
        ...validatedData,
        token: token,
        id: id,
      };

      const response = await fetch(
        `http://localhost:3000/api/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to initiate password reset: ${response.statusText}`
        );
      }

      return response.json();
    },
    {
      onSuccess: () => {
        toast.success(
          "Password reset successful. You can now log in with your new password."
        );
        navigate("/login");
      },
      onError: (error) => {
        if (error instanceof ZodError) {
          const errors: ErrorMessages = {};
          error.errors.forEach((err) => {
            if (err.path) {
              errors[err.path[0] as keyof ErrorMessages] = err.message;
            }
          });
          setErrorMessages(errors);
        } else {
          toast.error("Error resetting password");
        }
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValues({ password: "", confirmPassword: "" });
    setErrorMessages({});
    mutation.mutate(formValues);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errorMessages.password ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                />
                {errorMessages.password && (
                  <p className="text-xs text-red-500">
                    {errorMessages.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errorMessages.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                />
                {errorMessages.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errorMessages.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Updating..." : "Reset Password"}
              </button>
              {mutation.isError && (
                <p className="text-xs text-red-500">
                  Forgot Password failed: {errorMessages.password}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
