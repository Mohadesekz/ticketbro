import { WeekDateType } from "./interface";
export const PIXELS_PER_MINUTES = 2.5;
export const QUARTER = 15;
export const hoursInADay = 24;
export const minutesInAnHour = 60;
export const totalMinutes = hoursInADay * minutesInAnHour;

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
