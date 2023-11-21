import { create } from "zustand";
import { UserType } from "src/interface";
import { users } from "src/utils";

type Store = {
  users: UserType[];
  selectedUser: UserType;
  changeUser: (id: number) => void;
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
}));
