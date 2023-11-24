import { create } from "zustand";
import { UserType } from "src/interface";
import { users } from "src/mockData";
import { useEventStore } from "../stores/eventStore";

type Store = {
  users: UserType[];
  selectedUser: UserType;
  changeUser: (id: number) => void;
  updateUserBadge: () => void;
};

export const useUserStore = create<Store>()((set) => ({
  users: users,
  selectedUser: users[0],
  changeUser: (id) => {
    set((state) => ({
      users: state.users.map((user) => {
        if (user.id === id) {
          state.selectedUser = user;
          return { ...user, selected: true };
        } else {
          return { ...user, selected: false };
        }
      }),
    }));
  },
  updateUserBadge: () => {
    const dayEvents = useEventStore.getState().dayEvents;
    let userIndex: number[] = Array(users.length + 1).fill(0);
    dayEvents.map((event) => {
      return userIndex[event.userId] == undefined
        ? (userIndex[event.userId - 1] = 0)
        : (userIndex[event.userId - 1] += 1);
    });
    set((state) => ({
      users: state.users.map((user, index) => {
        return { ...user, counter: userIndex[index] };
      }),
    }));
  },
}));
