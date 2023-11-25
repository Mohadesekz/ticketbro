import { EventType, WeekDateType } from "./interface";
export const PIXELS_PER_MINUTES = 2.5;
export const QUARTER = 15;
export const HOURS_IN_A_DAY = 24;
export const MINUTES_IN_AN_HOUR = 60;
export const totalMinutes = HOURS_IN_A_DAY * MINUTES_IN_AN_HOUR;
export const PADDING_FROM_TOP = 40;
export const days: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
let weekDates: WeekDateType[] = [];
export function getCurrentWeekDates() {
  weekDates = [];
  const today = new Date();
  // Set timezone to São Paulo
  const options = { timeZone: "America/Sao_Paulo" };
  const saoPauloToday = today.toLocaleString("en-US", options);
  const currentDay = (new Date(saoPauloToday).getDay() + 6) % 7;

  const weekStart = new Date(saoPauloToday);
  weekStart.setDate(weekStart.getDate() - currentDay); // Get the starting day (Monday) of the current week
  let weekStartDate;
  let weekEndDate;

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    if (i === 0) {
      weekStartDate = new Date(date.toLocaleString("en-US"));
    }
    if (i === 6) {
      weekEndDate = new Date(date.toLocaleString("en-US"));
    }
    weekDates.push({
      day: days[i],
      date: new Date(date.toLocaleString("en-US")).getDate(),
      isCurrent: i === currentDay,
      selected: i === currentDay,
    });
  }
  return {
    weekDates,
    weekStartDate,
    weekEndDate,
    currentDay: new Date(saoPauloToday),
  };
}
export function getToday() {
  return weekDates.find((weekDate: WeekDateType) => weekDate.selected);
}
export function getDayAndMonth() {
  let currMonth: string = "";
  const today = new Date();
  // Set timezone to São Paulo
  const options = { timeZone: "America/Sao_Paulo" };
  const saoPauloToday = today.toLocaleString("en-US", options);
  currMonth +=
    new Date(saoPauloToday).toLocaleString("default", {
      month: "long",
    }) +
    " " +
    new Date(saoPauloToday).getDate();
  return currMonth;
}
export function getYear() {
  let thisYear: string = "";
  const today = new Date();
  // Set timezone to São Paulo
  const options = { timeZone: "America/Sao_Paulo" };
  const saoPauloToday = today.toLocaleString("en-US", options);
  thisYear += new Date(saoPauloToday).getFullYear();
  return thisYear;
}

export function getCurrentTime() {
  const today = new Date();
  const currentHour = today.getHours();
  const currentMinute = String(today.getMinutes()).padStart(2, "0");
  return currentHour + ":" + currentMinute;
}

export function getCurrentTimeInSaoPaulo() {
  const today = new Date();
  // Set timezone to São Paulo
  const options = { timeZone: "America/Sao_Paulo" };
  const saoPauloToday = today.toLocaleString("en-US", options);
  const currentHour = new Date(saoPauloToday).getHours();
  const currentMinute = String(new Date(saoPauloToday).getMinutes()).padStart(
    2,
    "0"
  );
  return currentHour + ":" + currentMinute;
}

export function returnSplitedTime(time: string) {
  const timeParts = time.split(":");
  const hour = parseInt(timeParts[0], 10);
  const shiftedHour = (hour + 15) % 24;
  const minutes = parseInt(timeParts[1], 10);
  return {
    pixels: PIXELS_PER_MINUTES * (shiftedHour * MINUTES_IN_AN_HOUR + minutes),
    hour,
    minutes,
  };
}

export function returnHeightBasedOnTimeDifference(
  startTime: string,
  endTime: string
) {
  const { hour: startHour, minutes: startMinute } =
    returnSplitedTime(startTime);
  const { hour: endHour, minutes: endMinute } = returnSplitedTime(endTime);

  let startMinutes = startHour * MINUTES_IN_AN_HOUR + startMinute;
  let endMinutes = endHour * MINUTES_IN_AN_HOUR + endMinute;

  if (endMinutes < startMinutes) {
    endMinutes += HOURS_IN_A_DAY * MINUTES_IN_AN_HOUR; // Add 24 hours worth of minutes
  }
  const timeDifference = endMinutes - startMinutes;
  const heightBasedOnTimeDifference = timeDifference * PIXELS_PER_MINUTES;
  return heightBasedOnTimeDifference;
}

export function checkTimeConflict(event: EventType, time: string) {
  const { hour, minutes: minute } = returnSplitedTime(time);
  const { hour: eventStartHour, minutes: eventStartMinute } = returnSplitedTime(
    event.startTime
  );
  const { hour: eventEndHour, minutes: eventEndMinute } = returnSplitedTime(
    event.endTime
  );

  if (hour >= eventStartHour && hour <= eventEndHour) {
    if (minute >= eventStartMinute && minute <= eventEndMinute) {
      return true;
    }
  }
  return false;
}
