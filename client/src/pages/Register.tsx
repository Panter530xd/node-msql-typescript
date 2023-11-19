import React, { useState } from "react";
import { z, ZodError } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  termsAgreement: boolean;
}

interface ErrorMessages {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const registrationSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters" }),
  termsAgreement: z.boolean(),
});

const RegisterUser: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    termsAgreement: false,
  });
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data: FormValues) => {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return response.json();
    },
    {
      onSuccess: () => {
        toast.success("User registered successfully");
        queryClient.invalidateQueries(["userData"]);
        setFormValues({
          email: "",
          password: "",
          confirmPassword: "",
          termsAgreement: false,
        });
        navigate("/login");
      },
      onError: (error: any) => {
        console.error("Error during registration:", error);

        if (error instanceof ZodError) {
          const errors: ErrorMessages = {};
          error.errors.forEach((err) => {
            if (err.path) {
              errors[err.path[0] as keyof ErrorMessages] = err.message;
            }
          });
          setErrorMessages(errors);
          toast.error("Validation Error");
        } else {
          console.error("Error object from server:", error);

          if (
            error.response?.status === 400 &&
            error.response?.data?.message ===
              "User with this email already exists"
          ) {
            toast.error("User with this email already exists.");
          } else {
            toast.error("Registration failed. Please try again later.");
          }
        }
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = registrationSchema.parse(formValues);

      if (validatedData.password !== formValues.confirmPassword) {
        setErrorMessages({
          confirmPassword: "Passwords do not match",
        });
        return;
      }

      setErrorMessages({});

      await mutation.mutateAsync(validatedData);
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
        console.error("Error during form validation:", error);
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create account
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

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    name="termsAgreement"
                    checked={formValues.termsAgreement}
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              {mutation.isError && (
                <p className="text-xs text-red-500">
                  Registration failed: {mutation.error.message}
                </p>
              )}
              {mutation.isLoading && (
                <p className="text-xs text-gray-500">Registering...</p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterUser;
