import { create } from "zustand";
import { EventType } from "src/interface";
import { eventsData } from "src/mockData";

type Store = {
  events: EventType[];
  selectedEvents: EventType[];
  filterEvents: (date: number, userId: number) => void;
};

export const useEventStore = create<Store>()((set) => ({
  events: eventsData,
  selectedEvents: [],
  filterEvents: (date, userId) => {
    set((state) => ({
      selectedEvents: state.events.filter(
        (event) => event.date === date && event.userId === userId
      ),
    }));
  },
}));
