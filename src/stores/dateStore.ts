import { create } from "zustand";
import { WeekDateType } from "src/interface";
import { getCurrentWeekDates, getToday } from "src/utils";

type Store = {
  currentWeek: WeekDateType[];
  selectedDate: WeekDateType | undefined;
  changeDate: (date: number) => void;
};

export const useDateStore = create<Store>()((set) => ({
  currentWeek: getCurrentWeekDates(),
  selectedDate: getToday(),
  changeDate: (date) => {
    set((state) => ({
      currentWeek: state.currentWeek.map((item) => {
        if (item.date === date) {
          state.selectedDate = item;
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      }),
    }));
  },
}));
