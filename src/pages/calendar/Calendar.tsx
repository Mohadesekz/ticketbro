import EventsContainer from "./events/EventsContainer";
import Users from "./users/Users";
import WeekDays from "./weekDays/WeekDays";

const Calendar = () => {
  return (
    <div className="h-full w-full">
      <WeekDays />
      <Users />
      <EventsContainer />
    </div>
  );
};

export default Calendar;
