import {
  FaHouseChimney,
  FaCalendarDays,
  FaShop,
  FaRocketchat,
  FaGear,
} from "react-icons/fa6";
import { NavItemType } from "src/interface";

export const navigation: NavItemType[] = [
  { name: "Home", path: "/", icon: <FaHouseChimney /> },
  { name: "Calendar", path: "/calendar", icon: <FaCalendarDays /> },
  { name: "Shop", path: "/shop", icon: <FaShop /> },
  { name: "Messenger", path: "/messenger", icon: <FaRocketchat /> },
  { name: "Setting", path: "/setting", icon: <FaGear /> },
];
