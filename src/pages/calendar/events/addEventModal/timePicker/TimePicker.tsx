import { useEffect, useLayoutEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HOURS_IN_A_DAY, MINUTES_IN_AN_HOUR } from "src/utils";
const MIN_HOUR = 0;
const MIN_MINUTE = -15;
const convertNumericTimeToString = (time: number) => {
  const timeLength = time.toString().length;
  return timeLength > 1 ? time.toString() : "0" + time.toString();
};
const checkTimeInRange = (
  time: number,
  max: number,
  min: number,
  action: string
) => {
  return action === "inc" ? time < max : time > min;
};

type IProps = {
  defaultHour: number;
  recievedTime: (time: string) => void;
};

const TimePicker = ({ recievedTime, defaultHour }: IProps) => {
  const [hour, setHour] = useState<number>(defaultHour);
  const [minute, setMinute] = useState<number>(15);

  const handleHourChange = (action: string) => {
    if (hour === 0 && action === "dec") {
      setHour(23);
      return;
    }

    action === "inc"
      ? setHour((prevHour) =>
          checkTimeInRange(prevHour, HOURS_IN_A_DAY, MIN_HOUR, action)
            ? prevHour + 1
            : prevHour
        )
      : setHour((prevHour) =>
          checkTimeInRange(prevHour, HOURS_IN_A_DAY, MIN_HOUR, action)
            ? prevHour - 1
            : prevHour
        );
  };
  const handleMinuteChange = (action: string) => {
    if (hour === 24 && action === "inc") return;
    if (hour === 0 && minute === 0 && action === "dec") return;

    action === "inc"
      ? setMinute((prevMinute) =>
          checkTimeInRange(prevMinute, MINUTES_IN_AN_HOUR, MIN_MINUTE, action)
            ? prevMinute + 15
            : prevMinute
        )
      : setMinute((prevMinute) =>
          checkTimeInRange(prevMinute, MINUTES_IN_AN_HOUR, MIN_MINUTE, action)
            ? prevMinute - 15
            : prevMinute
        );
  };
  const handleTimeChange = (type: string, action: string) => {
    type === "hour" ? handleHourChange(action) : handleMinuteChange(action);
  };

  useLayoutEffect(() => {
    if (minute === 60) {
      setMinute(0);
      handleHourChange("inc");
    }
    if (minute < 0) {
      setMinute(45);
      handleHourChange("dec");
    }
  }, [minute]);

  useEffect(() => {
    if (hour === 24) {
      setHour(0);
    }
  }, [hour]);
  useEffect(() => {
    recievedTime(
      convertNumericTimeToString(hour) +
        ":" +
        convertNumericTimeToString(minute)
    );
  }, [hour, minute]);

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center justify-center w-8 text-[10px]">
        <IoIosArrowUp
          className="text-white cursor-pointer"
          onClick={() => {
            handleTimeChange("hour", "inc");
          }}
        />
        <input
          type="text"
          value={convertNumericTimeToString(hour)}
          onChange={(e: any) => {
            setHour(e);
          }}
          disabled
          className="max-w-[20px] text-center text-white bg-transparent select-none"
        />
        <IoIosArrowDown
          className="text-white cursor-pointer"
          onClick={() => {
            handleTimeChange("hour", "dec");
          }}
        />
      </div>
      <span className="text-white text-lg">:</span>
      <div className="flex flex-col items-center justify-center w-8 text-[10px]">
        <IoIosArrowUp
          className="text-white cursor-pointer"
          onClick={() => {
            handleTimeChange("minute", "inc");
          }}
        />
        <input
          type="text"
          value={convertNumericTimeToString(minute)}
          onChange={(e: any) => {
            setMinute(e);
          }}
          disabled
          className="max-w-[20px] text-center text-white bg-transparent select-none"
        />
        <IoIosArrowDown
          className="text-white cursor-pointer"
          onClick={() => {
            handleTimeChange("minute", "dec");
          }}
        />
      </div>
    </div>
  );
};

export default TimePicker;
