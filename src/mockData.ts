import { EventType, UserType, guestType } from "./interface";
import { getCurrentWeekDates } from "./utils";

const currentWeek = getCurrentWeekDates();

export const users: UserType[] = [
  {
    name: "Tania",
    id: 1,
    avatar: "https://i.pravatar.cc/50?img=5",
    selected: true,
    counter: 0,
  },
  {
    name: "Johannes",
    id: 2,
    avatar: "https://i.pravatar.cc/50?img=33",
    selected: false,
    counter: 0,
  },
  {
    name: "Mahaa",
    id: 3,
    avatar: "https://i.pravatar.cc/50?img=16",
    selected: false,
    counter: 0,
  },
  {
    name: "Reza",
    id: 4,
    avatar: "https://i.pravatar.cc/50?img=52",
    selected: false,
    counter: 0,
  },
  {
    name: "Alex",
    id: 5,
    avatar: "https://i.pravatar.cc/50?img=60",
    selected: false,
    counter: 0,
  },
];

export const guests: guestType[] = [
  {
    name: "John Doe",
    guestId: 1,
    avatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    name: "Lionel Renner",
    guestId: 2,
    avatar: "https://i.pravatar.cc/50?img=2",
  },
  {
    name: "Marshall Bailey",
    guestId: 3,
    avatar: "https://i.pravatar.cc/50?img=3",
  },
  {
    name: "Benedict Cumberbatch",
    guestId: 4,
    avatar: "https://i.pravatar.cc/50?img=4",
  },
  {
    name: "Adele",
    guestId: 5,
    avatar: "https://i.pravatar.cc/50?img=5",
  },
  {
    name: "Gary Oldman",
    guestId: 6,
    avatar: "https://i.pravatar.cc/50?img=6",
  },
  {
    name: "Johnny Depp",
    guestId: 7,
    avatar: "https://i.pravatar.cc/50?img=7",
  },
];

export const eventsData: EventType[] = [
  //first day, first user
  {
    eventDetail: {
      type: "Meeting",
      guestId: 1,
    },
    date: currentWeek[0].date,
    userId: 1,
    startTime: "09:00",
    endTime: "09:15",
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 2,
    },
    date: currentWeek[0].date,
    userId: 1,
    startTime: "09:30",
    endTime: "10:00",
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 3,
    },
    date: currentWeek[0].date,
    userId: 1,
    startTime: "10:15",
    endTime: "10:30",
  },
  {
    eventDetail: { type: "Unavailable" },
    startTime: "10:30",
    endTime: "11:15",
    date: currentWeek[0].date,
    userId: 1,
  },
  {
    eventDetail: { type: "Lunch Break" },
    date: currentWeek[0].date,
    startTime: "14:15",
    endTime: "17:00",
    userId: 1,
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 4,
    },
    date: currentWeek[0].date,
    startTime: "21:15",
    endTime: "21:45",
    userId: 1,
  },

  // second day, second user
  {
    eventDetail: {
      type: "Meeting",
      guestId: 1,
    },
    date: currentWeek[1].date,
    userId: 2,
    startTime: "10:00",
    endTime: "11:15",
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 2,
    },
    date: currentWeek[1].date,
    userId: 2,
    startTime: "11:30",
    endTime: "12:15",
  },

  {
    eventDetail: { type: "Lunch Break" },
    startTime: "12:30",
    endTime: "14:30",
    date: currentWeek[1].date,
    userId: 2,
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 6,
    },
    date: currentWeek[1].date,
    userId: 2,
    startTime: "15:00",
    endTime: "15:30",
  },
  {
    eventDetail: { type: "Unavailable" },
    date: currentWeek[1].date,
    startTime: "16:00",
    endTime: "17:00",
    userId: 2,
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 4,
    },
    date: currentWeek[1].date,
    startTime: "17:15",
    endTime: "17:45",
    userId: 2,
  },

  // third day, third user
  {
    eventDetail: {
      type: "Unavailable",
    },
    date: currentWeek[2].date,
    userId: 3,
    startTime: "9:00",
    endTime: "12:00",
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 4,
    },
    date: currentWeek[2].date,
    userId: 3,
    startTime: "12:15",
    endTime: "13:00",
  },

  {
    eventDetail: { type: "Lunch Break" },
    startTime: "13:30",
    endTime: "14:30",
    date: currentWeek[2].date,
    userId: 3,
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 5,
    },
    date: currentWeek[2].date,
    userId: 3,
    startTime: "15:00",
    endTime: "15:30",
  },
  {
    eventDetail: { type: "Meeting", guestId: 1 },
    date: currentWeek[2].date,
    startTime: "16:00",
    endTime: "17:00",
    userId: 3,
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 2,
    },
    date: currentWeek[2].date,
    startTime: "19:00",
    endTime: "19:30",
    userId: 3,
  },

  // fourth day, fourth user
  {
    eventDetail: {
      type: "Meeting",
      guestId: 3,
    },
    date: currentWeek[3].date,
    userId: 4,
    startTime: "9:00",
    endTime: "10:00",
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 4,
    },
    date: currentWeek[3].date,
    userId: 4,
    startTime: "12:00",
    endTime: "13:00",
  },

  {
    eventDetail: { type: "Lunch Break" },
    startTime: "13:15",
    endTime: "14:30",
    date: currentWeek[3].date,
    userId: 4,
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 5,
    },
    date: currentWeek[3].date,
    userId: 4,
    startTime: "15:00",
    endTime: "15:30",
  },

  // fifth day, fifth user
  {
    eventDetail: {
      type: "Meeting",
      guestId: 6,
    },
    date: currentWeek[4].date,
    userId: 5,
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    eventDetail: {
      type: "Meeting",
      guestId: 2,
    },
    date: currentWeek[4].date,
    userId: 5,
    startTime: "12:15",
    endTime: "13:00",
  },

  {
    eventDetail: { type: "Lunch Break" },
    startTime: "13:15",
    endTime: "14:30",
    date: currentWeek[4].date,
    userId: 5,
  },
];
