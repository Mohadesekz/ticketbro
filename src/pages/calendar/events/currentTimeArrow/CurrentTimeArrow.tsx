import {
  PADDING_FROM_TOP,
  getCurrentTimeInSaoPaulo,
  returnSplitedTime,
} from "src/utils";

const CurrentTimeArrow = ({}) => {
  getCurrentTimeInSaoPaulo();

  return (
    <div
      className="absolute w-full "
      style={{
        top:
          returnSplitedTime(getCurrentTimeInSaoPaulo()).pixels +
          PADDING_FROM_TOP,
      }}
    >
      <div className="w-full h-[1px] bg-white"></div>
      <div className="relative flex">
        <div className="w-max bg-white text-black text-[10px] px-[10px] py-[3px] font-bold rounded-md relative left-4 bottom-3">
          {getCurrentTimeInSaoPaulo()}
        </div>
        <div className="wtf relative w-2 h-2 after:absolute after:contents-[''] after:left-[15px] after:top-[-6px] after:border-[6px] after:border-transparent after:border-l-white"></div>
      </div>
    </div>
  );
};

export default CurrentTimeArrow;
