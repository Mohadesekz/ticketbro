import { WeekDateType } from "./interface";
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

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    weekDates.push({
      day: days[i],
      date: new Date(date.toLocaleString("en-US")).getDate(),
      isCurrent: i === currentDay,
      selected: i === currentDay,
    });
  }
  return weekDates;
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

export function returnPixelBasedOnTime(time: string) {
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
