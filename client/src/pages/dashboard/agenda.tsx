import { useForm, Controller } from "react-hook-form";

import CustomTimePicker from "../../componets/Custom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

interface FormData {
  eventDurationFrom: string;
  eventDurationTo: string;
  eventOpeningFrom: string;
  eventOpeningTo: string;
  findYourSpotFrom: string;
  findYourSpotTo: string;
  firstRoundSessionsFrom: string;
  firstRoundSessionsTo: string;
  secondRoundSessionsFrom: string;
  secondRoundSessionsTo: string;
  registrationFrom: string;
  registrationTo: string;
  presentationsFrom: string;
  presentationsTo: string;
}

const DashboardCreate = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const createAgendaItem = async (data: FormData) => {
    const response = await fetch(`http://localhost:3000/api/agenda`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create agenda");
    }
  };
  const { mutate } = useMutation(createAgendaItem, {
    onSuccess: () => {
      reset();
      toast.success("Agenda created successfully", {
        icon: "🎉",
      });
    },
    onError: (error) => {
      toast.error("Failed to create agenda", {
        icon: "❌",
      });
      console.error("An error occurred while creating the agenda:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
    reset();
  };

  const handleCancelClick = () => {
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="md:w-7/12 w-11/12 space-y-4 mx-auto font-exoFont pt-10">
          <h2 className="font-bold">Day 1</h2>

          <div className="flex justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate">
              Event duration
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="eventDurationFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventDurationFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.eventDurationFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="eventDurationTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventDurationTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.eventDurationTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate">
              Event opening
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="eventOpeningFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventOpeningFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.eventOpeningFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="eventOpeningTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventOpeningTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.eventOpeningTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate">
              Find your spot
            </h4>
            <div className="flex items-center  space-x-2">
              <Controller
                control={control}
                name="findYourSpotFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="findYourSpotFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              {errors.findYourSpotFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}

              <Controller
                control={control}
                name="findYourSpotTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="findYourSpotTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.findYourSpotTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate hover:text-clip">
              First round mentorship sessions
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="firstRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.firstRoundSessionsFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="firstRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.firstRoundSessionsTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md font-exoFont">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate">
              Second round mentorship sessions
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="secondRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.secondRoundSessionsFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="secondRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.secondRoundSessionsTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-7/12 w-11/12 mx-auto max-w-screen-xl space-y-4 font-exoFont">
          <h2 className="font-bold">Day 2</h2>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate">
              Registration
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="registrationFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="registrationFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.registrationFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="registrationTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="registrationTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.registrationTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate ">
              First round mentorship sessions
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="firstRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.firstRoundSessionsFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="firstRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.firstRoundSessionsTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis truncate">
              Second round mentorship sessions
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="secondRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.secondRoundSessionsFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="secondRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.secondRoundSessionsTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>

          <div className="flex  justify-between items-center border border-black py-2 px-4 rounded-md">
            <h4 className="font-medium overflow-hidden text-ellipsis">
              Presentations
            </h4>
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="presentationsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="presentationsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.presentationsFrom && (
                <p className=" text-red-500 font-semibold">
                  From time is required.
                </p>
              )}
              <Controller
                control={control}
                name="presentationsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="presentationsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors.presentationsTo && (
                <p className=" text-red-500 font-semibold">
                  To time is required.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-7/12 w-11/12 max-w-screen-xl mx-auto flex justify-between pb-10">
          <button
            type="reset"
            className="py-2 px-7 bg-white border-black border rounded-lg font-medium"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-7 bg-greenis text-white rounded-lg font-bold"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default DashboardCreate;
