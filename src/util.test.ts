import { describe, expect, it } from "vitest";
import {
  getCurrentWeekDates,
  getToday,
  getDayAndMonth,
  getYear,
  returnSplitedTime,
  getCurrentTime,
  getCurrentTimeInSaoPaulo,
  returnHeightBasedOnTimeDifference,
  checkTimeConflict,
} from "./utils";
import { WeekDateType } from "./interface";

let weekDates: WeekDateType[] = [];

describe("getCurrentWeekDates function", () => {
  it("should return an object with weekDates, weekStartDate, weekEndDate, and currentDay", () => {
    const result = getCurrentWeekDates();
    weekDates = result.weekDates;

    // Check if the result contains the expected keys
    expect(result).toHaveProperty("weekDates");
    expect(result).toHaveProperty("weekStartDate");
    expect(result).toHaveProperty("weekEndDate");
    expect(result).toHaveProperty("currentDay");

    // Add more specific assertions based on the expected behavior of the function
    // For instance, check if weekDates is an array with length 7
    expect(result.weekDates).toBeInstanceOf(Array);
    expect(result.weekDates).toHaveLength(7);

    // Check the structure and data integrity of weekDates objects
    result.weekDates.forEach((dayObject) => {
      expect(dayObject).toHaveProperty("day");
      expect(dayObject).toHaveProperty("date");
      expect(dayObject).toHaveProperty("isCurrent");
      expect(dayObject).toHaveProperty("selected");
      expect(typeof dayObject.day).toBe("string");
      expect(typeof dayObject.date).toBe("number");
      expect(typeof dayObject.isCurrent).toBe("boolean");
      expect(typeof dayObject.selected).toBe("boolean");
    });

    expect(result.weekStartDate).toBeInstanceOf(Date);
    expect(result.weekEndDate).toBeInstanceOf(Date);
    expect(result.currentDay).toBeInstanceOf(Date);
  });
});

describe("getToday function", () => {
  it("should return the selected day from weekDates as today", () => {
    const result = getToday();
    // Ensure the function returns the expected day object when a day is selected
    const expectedSelectedDay = weekDates.find((day) => day.selected);
    expect(result).toEqual(expectedSelectedDay);
  });
});

describe("getDayAndMonth function", () => {
  it("should return a string containing current month and day in São Paulo timezone", () => {
    const result = getDayAndMonth();
    expect(result).toBeTypeOf("string");
  });
});

describe("getYear function", () => {
  it("should return a string containing current year in São Paulo timezone", () => {
    const result = getYear();
    expect(result).toBeTypeOf("string");
  });
});

describe("getCurrentTime function", () => {
  it("should return a string containing current time in local timezone", () => {
    const result = getCurrentTime();
    expect(result).toBeTypeOf("string");
  });
});

describe("getCurrentTimeInSaoPaulo function", () => {
  it("should return a string containing current time in São Paulo timezone", () => {
    const result = getCurrentTimeInSaoPaulo();
    expect(result).toBeTypeOf("string");
  });
});

describe("returnSplitedTime function", () => {
  it("should correctly split and calculate time", () => {
    const testTime = "10:00";
    const expectedResult = {
      pixels: 150,
      hour: 10,
      minutes: 0,
    };
    const result = returnSplitedTime(testTime);
    expect(result.pixels).toBe(expectedResult.pixels);
    expect(result.hour).toBe(expectedResult.hour);
    expect(result.minutes).toBe(expectedResult.minutes);
  });
});

describe("returnHeightBasedOnTimeDifference function", () => {
  const PIXELS_PER_MINUTES = 2.5;

  it("should calculate height based on time difference", () => {
    // Test case 1: Start and end time on the same day
    const startTime1 = "09:00";
    const endTime1 = "13:30";
    const expectedHeight1 = 270 * PIXELS_PER_MINUTES; // 270 minutes between 9:00 and 13:30

    const result1 = returnHeightBasedOnTimeDifference(startTime1, endTime1);
    expect(result1).toEqual(expectedHeight1);

    // Test case 2: Start and end time crossing midnight
    const startTime2 = "23:00";
    const endTime2 = "01:30";
    const expectedHeight2 = 150 * PIXELS_PER_MINUTES; // 2.5 hours between 23:00 and 1:30
    const result2 = returnHeightBasedOnTimeDifference(startTime2, endTime2);
    expect(result2).toEqual(expectedHeight2);
  });
});

describe("checkTimeConflict function", () => {
  it("should correctly check for time conflicts", () => {
    // Test case 1: Time falls within the event time range
    const startTime1 = "09:00";
    const endTime1 = "12:00";
    const timeToCheck1 = "10:30";

    const result1 = checkTimeConflict(startTime1, endTime1, timeToCheck1);
    expect(result1).toBe(true);

    // Test case 2: Time is before the event start time
    const startTime2 = "14:00";
    const endTime2 = "17:00";
    const timeToCheck2 = "12:30";

    const result2 = checkTimeConflict(startTime2, endTime2, timeToCheck2);
    expect(result2).toBe(false);

    // Test case 3: Time is after the event end time
    const startTime3 = "08:00";
    const endTime3 = "10:00";
    const timeToCheck3 = "11:30";

    const result3 = checkTimeConflict(startTime3, endTime3, timeToCheck3);
    expect(result3).toBe(false);

    // Test case 4: Time is exactly equal to event start time
    const startTime4 = "14:00";
    const endTime4 = "17:00";
    const timeToCheck4 = "14:00"; // Conflict as it's exactly the event start time

    const result4 = checkTimeConflict(startTime4, endTime4, timeToCheck4);
    expect(result4).toBe(true);
  });
});
