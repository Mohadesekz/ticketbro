import { motion } from "framer-motion";
import { WeekDateType } from "src/interface";
import { getDayAndMonth, getYear, days } from "src/utils";
import { useDateStore } from "src/stores/dateStore";

const WeekDays = () => {
  const currentWeek = useDateStore((state) => state.currentWeek);
  const changeDate = useDateStore((state) => state.changeDate);

  return (
    <div
      id="weekdays"
      className="flex flex-col pb-3 bg-dark-blue border-b border-[#243043] border-solid"
    >
      <div className="h-10 flex items-center justify-start px-5">
        <span className="mr-2 font-bold text-[13px]">{getDayAndMonth()},</span>
        <span className="text-[#818691] text-[14px] font-semibold">
          {" "}
          {getYear()}
        </span>
      </div>
      <div className="flex items-center justify-around h-7 text-[#596679] text-[10px] px-5 font-semibold">
        {days.map((weekDay: string) => (
          <div key={weekDay} className="">
            {weekDay}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-around h-8 px-5 text-xs font-semibold">
        {currentWeek.map((weekDate: WeekDateType) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={weekDate.date}
            className={`
            h-8 w-8 p-3 rounded-lg  flex items-center justify-center cursor-pointer hover:bg-[#293345]
            ${weekDate.selected && !weekDate.isCurrent ? "!bg-[#334155]" : ""}
            ${weekDate.isCurrent ? "text-black !bg-white !hover:bg-white " : ""}
            `}
            onClick={() => {
              changeDate(weekDate.date);
            }}
          >
            <span>{weekDate.date}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeekDays;
