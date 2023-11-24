import { useEffect } from "react";
import { useEventStore } from "src/stores/eventStore";
import { useDateStore } from "src/stores/dateStore";
import { useUserStore } from "src/stores/userStore";
import { EventType, guestType } from "src/interface";
import {
  PADDING_FROM_TOP,
  returnHeightBasedOnTimeDifference,
  returnPixelBasedOnTime,
} from "src/utils";
import { guests } from "src/mockData";
import defaultAvatar from "src/assets/images/defaultAvatar.png";
const scheduledEvents = ({}) => {
  const currUser = useUserStore((state) => state.selectedUser);
  const currentDay = useDateStore((state) => state.selectedDate);
  const filterEvents = useEventStore((state) => state.filterEvents);
  const selectedEvents = useEventStore((state) => state.selectedEvents);

  useEffect(() => {
    if (currUser && currentDay) {
      filterEvents(currentDay.date, currUser.id);
    }
  }, [currUser, currentDay]);

  return (
    <div className="">
      {selectedEvents &&
        selectedEvents.map((event: EventType, index: number) => (
          <div
            key={index}
            className={`absolute flex right-5 bg-[#20283B] p-2  w-[67%] rounded-lg ${
              event.eventDetail.type === "Meeting"
                ? "border-[#243043] border-2 opacity-100"
                : "opacity-70  bg-hatch-pattern bg-hatch"
            }`}
            style={{
              top:
                returnPixelBasedOnTime(event.startTime).pixels +
                PADDING_FROM_TOP,
              height: returnHeightBasedOnTimeDifference(
                event.startTime,
                event.endTime
              ),
            }}
          >
            {event.eventDetail.type === "Meeting" ? (
              <div className="w-full flex justify-between self-start text-xs font-bold text-[#bec1c9]">
                {
                  guests.find(
                    (guest: guestType) =>
                      guest.guestId === event.eventDetail.guestId
                  )?.name
                }
                {
                  <img
                    alt="profile picture"
                    src={
                      guests.find(
                        (guest: guestType) =>
                          guest.guestId === event.eventDetail.guestId
                      )?.avatar
                        ? guests.find(
                            (guest: guestType) =>
                              guest.guestId === event.eventDetail.guestId
                          )?.avatar
                        : defaultAvatar
                    }
                    className="rounded-full h-5"
                  />
                }
              </div>
            ) : (
              <div className="w-full flex flex-col items-center self-center justify-center text-[10px] font-bold text-[#bec1c9] ">
                <span>{event.eventDetail.type}</span>
                <span>{`${event.startTime}  -  ${event.endTime}`}</span>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default scheduledEvents;
