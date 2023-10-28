import React, { useState } from "react";
import { z, ZodError } from "zod";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { useLoginMutation } from "../utils/useLoginMutation";
interface FormValues {
  email: string;
  password: string;
}

interface ErrorMessages {
  email?: string;
  password?: string;
}

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const loginMutation = useLoginMutation();

  // const mutation = useMutation(
  //   async (data: FormValues) => {
  //     if (!data.email || !data.password) {
  //       throw new Error("Please provide both email and password");
  //     }

  //     const validatedData = loginSchema.parse(data);

  //     return login(validatedData.email, validatedData.password);
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["user"]);
  //       setFormValues({ email: "", password: "" });
  //       navigate("/");
  //       toast.success("User Success login");
  //     },
  //     onError: (error: any) => {
  //       if (typeof error === "object") {
  //         const errorMessage = error.message || "Login failed";
  //         toast.error(errorMessage);
  //       } else {
  //         console.error("Error during login:", error);
  //         toast.error("Internal Server Error");
  //       }
  //     },
  //   }
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse(formValues);
      setErrorMessages({});
      await loginMutation.mutateAsync(validatedData);
      setFormValues({ email: "", password: "" });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ErrorMessages = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0] as keyof ErrorMessages] = err.message;
          }
        });
        setErrorMessages(errors);
      } else {
        toast.error("Error during form validation");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errorMessages.email ? "border-red-500" : ""
                  }`}
                  placeholder="name@company.com"
                />
                {errorMessages.email && (
                  <p className="text-xs text-red-500">{errorMessages.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
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

              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loginMutation.isLoading}
              >
                {loginMutation.isLoading ? "Logging in..." : "Login"}
              </button>
              {loginMutation.isError && (
                <p className="text-xs text-red-500">
                  Login failed: {loginMutation.error.message}
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
