import { useEffect, useState } from "react";
import TimeLineCanvas from "./canvas/TimeLineCanvas";
import ScheduledEvents from "./scheduledEvents/ScheduledEvents";
import { useDateStore } from "src/stores/dateStore";
import CurrentTimeArrow from "./currentTimeArrow/CurrentTimeArrow";

export const PIXELS_PER_MINUTES = 2.5;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_A_DAY = 24;
export const TOTAL_HEIGHT =
  PIXELS_PER_MINUTES * MINUTES_IN_HOUR * HOURS_IN_A_DAY;

const returnCanvasHight = () => {
  let appHeight = document.getElementById("app")?.clientHeight;
  let headerHeight = document.getElementById("header")?.clientHeight;
  let weekdaysHeight = document.getElementById("weekdays")?.clientHeight;
  let usersHeight = document.getElementById("users")?.clientHeight;
  let navbarHeight = document.getElementById("navbar")?.clientHeight;

  if (!appHeight) return;
  if (!headerHeight) return;
  if (!weekdaysHeight) return;
  if (!usersHeight) return;
  if (!navbarHeight) return;

  let canvasParentHeight =
    appHeight - headerHeight - usersHeight - weekdaysHeight - navbarHeight;

  return canvasParentHeight;
};

const EventsContainer = () => {
  const [canvasHeight, setCanvasHeight] = useState(0);
  const currentDay = useDateStore((state) => state.selectedDate);

  useEffect(() => {
    let canvasHeight = returnCanvasHight();
    if (!canvasHeight) return;
    setCanvasHeight(canvasHeight);
  }, [canvasHeight]);

  useEffect(() => {
    const setCanvasHeightOnResize = () => {
      let canvasHeight = returnCanvasHight();
      if (!canvasHeight) return;
      setCanvasHeight(canvasHeight);
    };

    window.addEventListener("resize", setCanvasHeightOnResize);

    return () => {
      window.removeEventListener("resize", setCanvasHeightOnResize);
    };
  });

  return (
    <div className="flex-1">
      <div
        style={{ height: canvasHeight }}
        className="relative overflow-y-scroll overflow-x-hidden"
      >
        <TimeLineCanvas startTime="09:00" totalHeight={TOTAL_HEIGHT} />
        <ScheduledEvents />
        {currentDay?.isCurrent && <CurrentTimeArrow />}
      </div>
    </div>
  );
};

export default EventsContainer;
