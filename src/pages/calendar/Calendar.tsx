import { useEffect } from "react";
import EventsContainer from "./events/EventsContainer";
import Users from "./users/Users";
import WeekDays from "./weekDays/WeekDays";
import { useUserStore } from "src/stores/userStore";
import { useEventStore } from "src/stores/eventStore";

const Calendar = () => {
  const filterEventsOfASelectedDay = useEventStore(
    (state) => state.filterEventsOfASelectedDay
  );
  const updateUserBadge = useUserStore((state) => state.updateUserBadge);
  useEffect(() => {
    filterEventsOfASelectedDay();
    updateUserBadge();
  });

  return (
    <div className="h-full w-full">
      <WeekDays />
      <Users />
      <EventsContainer />
    </div>
  );
};

export default Calendar;
