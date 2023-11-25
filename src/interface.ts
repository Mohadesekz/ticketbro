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
  counter: number;
};
export type GuestType = {
  name: string;
  guestId: number;
  avatar?: string;
};

export type eventDetailType = {
  type: string;
  guestId?: number;
};

export type EventType = {
  eventDetail: eventDetailType;
  date: number;
  userId: number;
  startTime: string;
  endTime: string;
};
