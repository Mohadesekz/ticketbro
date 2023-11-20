export type WeekDateType = {
  day: string;
  date: number;
  isCurrent: boolean;
  selected: boolean;
};

export type NavItemType = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export type UserType = {
  name: string;
  id: number;
  avatar: string;
  selected: boolean;
};
