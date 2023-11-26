import { create } from "zustand";
import { EventType, GuestType } from "src/interface";
import { eventsData, guests } from "src/mockData";
import { useDateStore } from "./dateStore";

type Store = {
  events: EventType[];
  guests: GuestType[];
  selectedEvents: EventType[];
  dayEvents: EventType[];
  filterEventsOfASelectedDay: () => void;
  filterEvents: (date: number, userId: number) => void;
  addEvents: (event: EventType) => void;
  addGuest: (guest: GuestType) => void;
};

export const useEventStore = create<Store>()((set) => ({
  events: eventsData,
  guests: guests,
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
  addEvents: (event: EventType) => {
    set((state) => ({
      events: [...state.events, event],
    }));
  },
  addGuest: (guest: GuestType) => {
    set((state) => ({
      guests: [...state.guests, guest],
    }));
  },
}));
