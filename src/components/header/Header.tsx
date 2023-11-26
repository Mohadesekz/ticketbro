import { IoIosWifi } from "react-icons/io";
import { FaBatteryEmpty } from "react-icons/fa6";
import { TbAntennaBars4 } from "react-icons/tb";
import { getCurrentTime } from "src/utils";
import { useEffect, useState } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const tick = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(tick);
    };
  });

  return (
    <div
      id="header"
      className="px-5 relative flex text-sm inset-x-0 top-0 bg-dark-blue h-12 justify-around items-center "
    >
      <div className="clock grow basis-0 font-bold flex justify-around">
        <span>{currentTime}</span>
        <span></span>
      </div>
      <div className="w-24 bg-black rounded-full h-7 grow basis-0"></div>
      <div className="flex text-lg grow basis-0 justify-end">
        <TbAntennaBars4 className="ml-1" />
        <IoIosWifi className="ml-1" />
        <FaBatteryEmpty className="ml-2" />
      </div>
    </div>
  );
};

export default Header;
