import { create } from "zustand";
import { EventType } from "src/interface";
import { eventsData } from "src/mockData";
import { useDateStore } from "./dateStore";

type Store = {
  events: EventType[];
  selectedEvents: EventType[];
  dayEvents: EventType[];
  filterEventsOfASelectedDay: () => void;
  filterEvents: (date: number, userId: number) => void;
};

export const useEventStore = create<Store>()((set) => ({
  events: eventsData,
  selectedEvents: [],
  dayEvents: [],
  filterEventsOfASelectedDay: () => {
    set((state) => ({
      dayEvents: state.events.filter(
        (event) =>
          event.date === useDateStore.getState().selectedDate?.date &&
          event.eventDetail.type === "Meeting"
      ),
    }));
  },
  filterEvents: (date, userId) => {
    set((state) => ({
      selectedEvents: state.events.filter(
        (event) => event.date === date && event.userId === userId
      ),
    }));
  },
}));
