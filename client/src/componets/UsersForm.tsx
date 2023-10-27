import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAcademyData, { Academy } from "../utils/useAcademyData";
import useGroupsData, { Group } from "../utils/useGroupsData";
import useFoodAllergiesData, {
  FoodAllergies,
} from "../utils/useFoodAllergiesData";
import toast from "react-hot-toast";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  academy: string;
  group_name: string;
  number_months: string;
  participation: "live" | "online";
  food_allergies: string;
  food_preferences: string;
  accept_terms: boolean;
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>();

  const watchAcademy = watch("academy");
  const academiesOptions: Academy[] = useAcademyData() || [];
  const groupsQuery: Group[] = useGroupsData() || [];
  const foodsAllergiesQuery: FoodAllergies[] = useFoodAllergiesData() || [];
  console.log(academiesOptions);
  console.log(groupsQuery);

  const groupsPerAcademy =
    groupsQuery && watchAcademy
      ? groupsQuery.filter((group) => group.academyId === Number(watchAcademy))
      : null;
  console.log(groupsPerAcademy);
  console.log(watchAcademy);

  const createRegistration = async (data: FormValues) => {
    console.log("Registration data:", data);

    const response = await fetch(`http://localhost:3000/api/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error creating registration:", errorMessage);
      throw new Error("Registration failed");
    }

    return response.json();
  };

  const registrationMutation = useMutation(createRegistration, {
    onSuccess: () => {
      toast.success("Registration created successfully");
      reset();
    },
    onError: (error: Error) => {
      toast.error("Error creating registration");
      console.error("Error creating registration:", error);
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { ...formData } = data;

      const selectedAcademy = academiesOptions?.find(
        (academy) => academy.id.toString() === watchAcademy
      );

      formData.academy = selectedAcademy?.name || "";

      await registrationMutation.mutateAsync(formData);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 md:w-6/12 w-11/12 mx-auto md:p-20 p-5 rounded-lg shadow-lg"
      >
        <label htmlFor="name" className="text-gray-400 font-semibold">
          First name
        </label>
        <input
          type="text"
          id="first_name"
          {...register("first_name", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.first_name && (
          <span className="text-red-700 font-bold">Name is required</span>
        )}
        <label htmlFor="last_name" className="text-gray-400 font-semibold">
          Last name
        </label>
        <input
          type="text"
          id="last_name"
          {...register("last_name", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.last_name && (
          <span className="text-red-700 font-bold">Last name is required</span>
        )}
        <label htmlFor="email" className="text-gray-400 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.email && (
          <span className="text-red-700 font-bold">Email is required</span>
        )}
        <label htmlFor="phone" className="text-gray-400 font-semibold">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.phone && (
          <span className="text-red-700 font-bold">Phone is required</span>
        )}
        <label htmlFor="academy" className="text-gray-400 font-semibold">
          Select Academy:
        </label>
        <select
          {...register("academy", { required: true })}
          id="academy"
          name="academy"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value="">Select Academy</option>
          {academiesOptions &&
            academiesOptions?.map((academy) => (
              <option key={academy?.id} value={academy?.id}>
                {academy?.name}
              </option>
            ))}
        </select>

        {errors.academy && (
          <span className="text-red-700 font-bold">Academies are required</span>
        )}

        <div className="flex flex-col space-y-4">
          <label htmlFor="group_name" className="text-gray-400 font-semibold">
            Group
          </label>
          <select
            {...register("group_name", { required: true })}
            disabled={!watchAcademy && !groupsPerAcademy}
            id="group_name"
            name="group_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Group</option>
            {groupsPerAcademy &&
              groupsPerAcademy.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
          </select>
          {errors.group_name && (
            <span className="text-red-700 font-bold">Groups are required</span>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <label
            htmlFor="numberOfMonths"
            className="text-gray-400 font-semibold"
          >
            Number of months that you are involved in the academy
          </label>
          <input
            type="text"
            id="number_months"
            {...register("number_months", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          />
          {errors.number_months && (
            <span className="text-red-700 font-bold">
              Number of Monts is required
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <label
            htmlFor="participation"
            className="text-gray-400 font-semibold"
          >
            I will participate
          </label>
          <div className="flex w-8/12 mx-auto space-x-2">
            <div className="relative inline-flex items-center">
              <input
                type="radio"
                id="participation_live"
                value="live"
                {...register("participation", { required: true })}
                className="form-radio w-8 h-8 text-gray-600 transition duration-150 ease-in-out accent-white"
              />

              <label
                htmlFor="participation_live"
                className="ml-2 text-gray-400 font-bold"
              >
                Live
              </label>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="radio"
                id="participation_online"
                value="online"
                {...register("participation", { required: true })}
                className="form-radio w-8 h-8 text-gray-600 transition duration-150 ease-in-out accent-white"
              />
              <label
                htmlFor="participation_online"
                className="ml-2 text-gray-400 font-bold"
              >
                Online
              </label>
            </div>
          </div>
          {errors.participation && (
            <span className="text-red-700 font-bold text-center">
              Participation are required
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <label
            htmlFor="foodPreferences"
            className="text-gray-400 font-semibold"
          >
            Food allergies
          </label>
          <select
            id="food_allergies"
            {...register("food_allergies", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
          >
            <option value="">Select Allergie</option>
            {foodsAllergiesQuery &&
              foodsAllergiesQuery?.map((food) => (
                <option key={food?.id} value={food?.name}>
                  {food?.name}
                </option>
              ))}
          </select>
          {errors.food_allergies && (
            <span className="text-red-700 font-bold text-center">
              Food Allergies are required
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="food_preferences"
            className="text-gray-400 font-semibold"
          >
            Food Preferences
          </label>
          <input
            type="text"
            id="food_preferences"
            {...register("food_preferences", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          />
          {errors.food_preferences && (
            <span className="text-red-700 font-bold text-center">
              Food Preferences are required
            </span>
          )}
        </div>

        <div className="relative inline-flex items-center justify-center">
          <input
            type="checkbox"
            id="accept_terms"
            {...register("accept_terms", { required: true })}
            className="form-checkbox h-5 w-5 text-gray-600  transition duration-150 ease-in-out accent-white"
          />
          <label
            htmlFor="accept_terms"
            className="ml-2 font-semibold text-gray-400"
          >
            I accept the terms and conditions
          </label>
        </div>
        {errors.accept_terms && (
          <span className="text-red-700 font-bold text-center">
            Accept Terms are required
          </span>
        )}

        <button
          type="submit"
          disabled={registrationMutation.isLoading}
          className="bg-indigo-600 border-2 border-white text-white font-exoFont font-semibold px-4 py-2 rounded-lg disabled:bg-gray-400 w-full mx-auto"
        >
          {registrationMutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
