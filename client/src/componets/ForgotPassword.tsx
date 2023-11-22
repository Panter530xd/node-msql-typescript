import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { ZodError, z } from "zod";

interface FormValues {
  email: string;
}

interface ErrorMessages {
  email?: string;
}

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),
});

export default function ForgotPassword() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
  console.log(errorMessages);

  const mutation = useMutation(
    async (data: FormValues) => {
      const validatedData = ForgotPasswordSchema.parse(data);

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validatedData),
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
        toast.success("Password reset initiated. Check your email.");
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
          toast.error("Error during form validation");
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
    setFormValues({ email: "" });
    setErrorMessages({});
    mutation.mutate(formValues);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
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

              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Sending..." : "Send Reset Email"}
              </button>
              {mutation.isError && (
                <p className="text-xs text-red-500">
                  Forgot Password failed: {errorMessages.email}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
