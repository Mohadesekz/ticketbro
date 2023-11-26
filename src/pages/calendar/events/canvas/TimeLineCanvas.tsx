import React, { useRef, useEffect } from "react";
import {
  PADDING_FROM_TOP,
  PIXELS_PER_MINUTES,
  QUARTER,
  returnSplitedTime,
  totalMinutes,
} from "src/utils";
interface TimeLineCanvasProps {
  startTime: string; // Format: HH:MM (e.g., "09:00")
  totalHeight: number;
}
const LINE_COLOR = "#243043";
const TimeLineCanvas: React.FC<TimeLineCanvasProps> = ({
  startTime,
  totalHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (startTime && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 0.5;
        const { hour: startHour, minutes: startMinute } =
          returnSplitedTime(startTime);
        for (let i = 0; i <= totalMinutes; i += QUARTER) {
          const currentHour = startHour + Math.floor((startMinute + i) / 60);
          // const currentMinute = (startMinute + i) % 60;

          // Calculate y position for the line
          const y = i * PIXELS_PER_MINUTES + PADDING_FROM_TOP;

          if (Math.floor((startMinute + i) % 60) === 0) {
            // Draw the line
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.moveTo(0, y); // X position is 50 (for example)
            ctx.lineTo(20, y); // X position 500 (for example)
            ctx.stroke();
            ctx.closePath();
            // Draw the line
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.moveTo(70, y); // X position is 50 (for example)
            ctx.lineTo(500, y); // X position 500 (for example)
            ctx.stroke();
            ctx.closePath();
            // Draw the time label next to the line
            ctx.font = "12px Roboto";
            ctx.fillStyle = "gray";
            ctx.fillText(
              `${currentHour % 24} ${currentHour % 24 > 12 ? "PM" : "AM"}`,
              30,
              y + 5
            );
          } else {
            // Draw the line
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.moveTo(0, y); // X position is 50 (for example)
            ctx.lineTo(500, y); // X position 500 (for example)
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }, [startTime]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={totalHeight + 15}
      style={{ border: "1px solid transparent", margin: "0px 0 20px 0" }}
    />
  );
};

export default TimeLineCanvas;
