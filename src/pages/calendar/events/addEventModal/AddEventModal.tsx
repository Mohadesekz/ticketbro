import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  checkTimeConflict,
  getCurrentWeekDates,
  returnSplitedTime,
} from "src/utils";
import { useEffect, useState } from "react";
import { useUserStore } from "src/stores/userStore";
import { useEventStore } from "src/stores/eventStore";
import TimePicker from "./timePicker/TimePicker";
import { EventType, eventDetailType, GuestType } from "src/interface";
import { useDateStore } from "src/stores/dateStore";

type IProps = {
  setShowModal: (value: boolean) => void;
};

type IFormInput = {
  guest: string;
  eventType: "Unavailable" | "LunchBreak" | "Meeting";
  selectedDate: Date;
  startTime: string;
  endTime: string;
};

type ErrorType = {
  conflictError: boolean;
  differenceError: boolean;
};

const AddEventModal = ({ setShowModal }: IProps) => {
  const { weekStartDate, weekEndDate, currentDay } = getCurrentWeekDates();
  const currUser = useUserStore((state) => state.selectedUser);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const changeDate = useDateStore((state) => state.changeDate);

  const [timeError, setTimeError] = useState<ErrorType>({
    conflictError: false,
    differenceError: false,
  });

  const filterEvents = useEventStore((state) => state.filterEvents);
  const filterEventsOfASelectedDay = useEventStore(
    (state) => state.filterEventsOfASelectedDay
  );
  const updateUserBadge = useUserStore((state) => state.updateUserBadge);

  const addEvent = useEventStore((state) => state.addEvents);
  const addGuest = useEventStore((state) => state.addGuest);
  const selectedEvents = useEventStore((state) => state.selectedEvents);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    clearErrors,
  } = useForm<IFormInput>({
    defaultValues: {
      guest: "",
      eventType: "Unavailable",
      selectedDate: currentDay,
      startTime: "09:15",
      endTime: "10:15",
    },
  });

  useEffect(() => {
    if (!selectedDate) return;
    filterEvents(selectedDate.date, currUser.id);
    filterEventsOfASelectedDay();
    updateUserBadge();
    recievedStartTime(getValues("startTime"));
    recievedEndTime(getValues("endTime"));
  }, [selectedEvents.length]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let newGuest: GuestType;
    const eventDetail: eventDetailType = {
      type: data.eventType,
    };
    if (data.eventType === "Meeting") {
      const randomId = Math.floor(Math.random() * 1000 + 10);
      eventDetail["guestId"] = randomId;
      newGuest = {
        name: data.guest,
        guestId: randomId,
      };
      addGuest(newGuest);
    }
    if (!selectedDate) return;
    const newEvent: EventType = {
      startTime: data.startTime,
      endTime: data.endTime,
      userId: currUser.id,
      date: selectedDate.date,
      eventDetail,
    };

    addEvent(newEvent);
    filterEvents(selectedDate.date, currUser.id);
    filterEventsOfASelectedDay();
    updateUserBadge();
    setShowModal(false);
  };

  const validateTime = (startTime: string, endTime: string) => {
    const { hour: startHour, minutes: startMinute } =
      returnSplitedTime(startTime);
    const { hour: endHour, minutes: endMinute } = returnSplitedTime(endTime);
    if (startMinute >= 0 && startHour >= 0 && endHour >= 0 && endMinute >= 0) {
      if (
        endHour < startHour ||
        (endHour === startHour && endMinute <= startMinute)
      ) {
        setTimeError((prevProps: ErrorType) => ({
          ...prevProps,
          differenceError: true,
        }));
      } else {
        setTimeError((prevProps: ErrorType) => ({
          ...prevProps,
          differenceError: false,
        }));
      }
    }
  };

  const checkConflictsForEvents = () => {
    for (let i = 0; i < selectedEvents.length; i++) {
      const conflictStartTime: boolean = checkTimeConflict(
        getValues("startTime"),
        getValues("endTime"),
        selectedEvents[i].startTime
      );
      const conflictEndTime: boolean = checkTimeConflict(
        getValues("startTime"),
        getValues("endTime"),
        selectedEvents[i].endTime
      );

      if (conflictStartTime || conflictEndTime) {
        return true;
      }
    }
    return false;
  };

  const checkConflicts = () => {
    if (checkConflictsForEvents()) {
      setTimeError((prevProps: ErrorType) => ({
        ...prevProps,
        conflictError: true,
      }));
    } else {
      setTimeError((prevProps: ErrorType) => ({
        ...prevProps,
        conflictError: false,
      }));
    }
  };

  const recievedStartTime = (startTime: string) => {
    if (startTime) {
      setValue("startTime", startTime);
      validateTime(startTime, watch("endTime"));
      checkConflicts();
    }
  };

  const recievedEndTime = (endTime: string) => {
    if (endTime) {
      setValue("endTime", endTime);
      validateTime(watch("startTime"), endTime);
      checkConflicts();
    }
  };

  const selectedType = watch("eventType");
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 my-6 mx-auto max-w-[250px]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between h-6 px-4 py-3 rounded-t">
              <h3 className="text-xs font-semibold">Add Event</h3>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit(onSubmit)} className="py-2 text-black">
              <div className="relative p-3 flex-auto">
                <div className="mb-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-[10px] font-bold mb-1">
                    Type
                  </label>
                  <select
                    {...register("eventType", { required: true })}
                    className="block w-full bg-navy text-gray-200 text-xs py-1 px-2 pr-4 rounded leading-tight focus:outline-none "
                  >
                    <option value="Unavailable">Unavailable</option>
                    <option value="LunchBreak">Lunch Break</option>
                    <option value="Meeting">Meeting</option>
                  </select>
                </div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, height: 0 },
                    visible: { opacity: 1, height: "auto" },
                  }}
                  transition={{ duration: 0.3 }}
                  initial="hidden"
                  animate={selectedType === "Meeting" ? "visible" : "hidden"}
                  exit="hidden"
                  className="mb-3 flex flex-wrap -mx-3 mt-4"
                >
                  <div className="w-full px-3  md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-400 text-[10px] font-bold mb-1">
                      Guest Name
                    </label>
                    <input
                      {...register("guest", {
                        required: selectedType === "Meeting",
                      })}
                      type="text"
                      className="block w-full bg-navy text-xs text-gray-200 py-1 px-3 pr-4 rounded leading-tight focus:outline-none"
                      placeholder="Guest Name"
                    />
                    {errors.guest && (
                      <p className="text-red-500 text-[10px] mt-1 italic">
                        Meeting Details is required
                      </p>
                    )}
                  </div>
                </motion.div>
                <div className="mb-6 w-full">
                  <label className="block uppercase tracking-wide text-gray-400 text-[10px] font-bold mb-1">
                    Date
                  </label>
                  {selectedDate && (
                    <DatePicker
                      {...register("selectedDate", { required: true })}
                      selected={new Date(new Date().setDate(selectedDate.date))}
                      minDate={weekStartDate}
                      maxDate={weekEndDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={(value: Date) => {
                        setValue("selectedDate", value);
                        changeDate(value.getDate());
                        filterEvents(value.getDate(), currUser.id);
                        filterEventsOfASelectedDay();
                        updateUserBadge();
                        recievedStartTime(getValues("startTime"));
                        recievedEndTime(getValues("endTime"));
                      }}
                      className="block w-full bg-navy text-xs text-gray-200 py-1 px-3 pr-20 rounded leading-tight focus:outline-none"
                    />
                  )}
                  {errors.selectedDate && (
                    <p className="text-red-500 text-[10px] mt-1 italic">
                      Date is required
                    </p>
                  )}
                </div>

                <div className="mb-6 w-full flex items-center justify-between">
                  <label className="block uppercase tracking-wide text-gray-400 text-[10px] font-bold mb-1">
                    Start Time
                  </label>
                  <TimePicker
                    recievedTime={recievedStartTime}
                    defaultHour={9}
                  />
                  {errors.selectedDate && (
                    <p className="text-red-500 text-[10px] mt-1 italic">
                      Start time is required
                    </p>
                  )}
                </div>
                <div className="mb-6 w-full flex items-center justify-between">
                  <label className="block uppercase tracking-wide text-gray-400 text-[10px] font-bold mb-1">
                    End Time
                  </label>
                  <TimePicker recievedTime={recievedEndTime} defaultHour={10} />
                  {errors.selectedDate && (
                    <p className="text-red-500 text-[10px] mt-1 italic">
                      End time is required
                    </p>
                  )}
                </div>

                {timeError.differenceError ? (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    End time should be after start time!
                  </p>
                ) : timeError.conflictError ? (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    There is another event in this time and date!
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="flex items-center justify-end px-3 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-[10px] outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    clearErrors();
                    setTimeError({
                      conflictError: false,
                      differenceError: false,
                    });
                  }}
                >
                  Close
                </button>
                <button
                  className="bg-[#3c46e0] text-white active:bg-[#3c46e0] font-bold uppercase text-[10px] px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div
        // className="opacity-50 w-80 left-[33%] top-[62px] rounded-3xl fixed inset-0 z-40 bg-black"
        className="opacity-25 w-full fixed inset-0 z-40 bg-black"
        // style={{ height: appHeight }}
      ></div>
    </div>
  );
};

export default AddEventModal;
