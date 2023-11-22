import { useContext } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { DashboardContext } from "../../context/DashboardContext";
import useAcademyData from "../../utils/useAcademyData";


type EventType = {
  value: string;
  label: string;
};

type Academy = {
  id: number;
  name: string;
};

type FormData = {
  name_of_event: string;
  location: string;
  type_of_event: EventType;
  submission_deadline: string;
  start_date: string;
  end_date: string;
  academies_part: string;
  event_info: string;
  client_info: string;
};

const options: EventType[] = [
  { value: "live", label: "Live" },
  { value: "online", label: "Online" },
];

const DashboardDescription = () => {
  const { eventName } = useContext(DashboardContext);
  const academiesOptions: Academy[] = useAcademyData() || [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const createEvent = async (data: FormData) => {
    data.name_of_event = eventName;

    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create event");
    }
  };
  const { mutate } = useMutation(createEvent, {
    onSuccess: () => {
      reset();
      toast.success("Event created successfully", {
        icon: "🎉",
      });
    },
    onError: (error) => {
      toast.error("Failed to create event", {
        icon: "❌",
      });
      console.error("An error occurred while creating the event:", error);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.name_of_event = eventName;
    mutate(data);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    input.type = "date";
  };

  const handleCancelClick = () => {
    reset();
  };

  return (
    <>
      <main className="md:w-7/12 w-11/12 max-w-screen-xl mx-auto md:py-10 py-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-7">
          <div className="flex  items-center gap-5">
            <div className="flex-col w-1/2">
              <input
                type="text"
                id="location"
                placeholder="location"
                {...register("location", { required: true })}
                className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg block w-full p-2.5"
              />
              {errors.location && (
                <span className="text-red-700 font-bold">
                  location is required
                </span>
              )}
            </div>
            <div className="flex-col w-1/2">
              <select
                id="type_of_event"
                {...register("type_of_event", { required: true })}
                className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg block w-full p-2.5"
              >
                <option value="">Type of event</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.type_of_event && (
                <span className="text-red-700 font-bold">
                  Type of event is required
                </span>
              )}
            </div>
          </div>
          <div className="md:flex md:justify-between md:items-center md:gap-5 space-y-7 md:space-y-0">
            <div className="w-full">
              <input
                id="submission_deadline"
                type="text"
                onFocus={handleFocus}
                placeholder="Submission deadline"
                {...register("submission_deadline", { required: true })}
                className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg  block w-full p-2.5   placeholder:w-full md:px-4 px-2 font-exoFont"
              />
              {errors.submission_deadline && (
                <span className="text-red-700 font-bold">
                  Submission deadline Deadline is required
                </span>
              )}
            </div>

            <div className="flex justify-between items-center gap-5 w-full">
              <div className="flex-col w-1/2">
                <input
                  id="start_date"
                  type="text"
                  onFocus={handleFocus}
                  placeholder="Event duration from"
                  {...register("start_date", { required: true })}
                  className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg  block w-full p-2.5   placeholder:w-full md:px-4 px-2 font-exoFont"
                />
                {errors.start_date && (
                  <span className="text-red-700 font-bold">
                    Start Date Deadline is required
                  </span>
                )}
              </div>
              <div className="flex-col w-1/2">
                <input
                  id="end_date"
                  type="text"
                  onFocus={handleFocus}
                  placeholder="Event duration to"
                  {...register("end_date", { required: true })}
                  className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg  block w-full p-2.5   placeholder:w-full md:px-4 px-2 font-exoFont"
                />
                {errors.end_date && (
                  <span className="text-red-700 font-bold">
                    End Date Deadline is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <select
            id="academies_part"
            {...register("academies_part", { required: true })}
            className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg block w-full p-2.5 placeholder:w-full md:px-4 px-2 font-exoFont"
          >
            <option value="">Academies part of the event</option>
            {academiesOptions &&
              academiesOptions?.map((academy) => (
                <option key={academy?.id} value={academy?.id}>
                  {academy?.name}
                </option>
              ))}
          </select>
          {errors.academies_part && (
            <span className="text-red-700 font-bold">
              Academies part of the event is required
            </span>
          )}
          <textarea
            id="event_info"
            placeholder="Event info"
            {...register("event_info", { required: true, maxLength: 1000 })}
            className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg block w-full p-14"
          />
          {errors.event_info && (
            <span className="text-red-700 font-bold">
              Event info is required
            </span>
          )}
          <textarea
            id="client_info"
            placeholder="Client info"
            {...register("client_info", { required: true, maxLength: 1000 })}
            className="bg-gray-50 border border-black text-gray-900 text-base rounded-lg block w-full p-14"
          />
          {errors.client_info && (
            <span className="text-red-700 font-bold">
              Client info is required
            </span>
          )}
          <div className="flex items-center md:gap-5 gap-3">
            <div>
              <button
                className="py-2 px-7 bg-white border-black border rounded-lg font-medium"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
            <div className="flex items-end gap-5 ml-auto">
              <button
                type="submit"
                className="py-2 px-7 bg-greenis text-white rounded-lg font-bold"
              >
                Create
              </button>
              <button className="py-2 px-7 bg-gray-200 font-bold border-greenis border text-greenis rounded-lg">
                Share
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default DashboardDescription;
