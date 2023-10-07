import * as React from "react";
import { useDrag } from "react-use-gesture";
import { cn } from "@/lib/utils";

function formatTime(seconds) {
  return [Math.floor(seconds / 60), Math.floor(seconds % 60)]
    .map((x) => x.toString())
    .map((x) => (x.length === 1 ? `0${x}` : x))
    .join(":");
}

const minMax = (min, max, value) => {
  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
};

function getNewTimeProps(barRect, clientX, duration) {
  const seconds = minMax(
    0,
    duration,
    Math.floor(((clientX - barRect.left) / barRect.width) * duration)
  );

  const progress = (seconds / duration) * 100;

  return { seconds, progress };
}

function TimeBar({
  style,
  className,
  duration,
  progress,
  currentTime,
  isSeeking,
  setTime,
}) {
  const barRef = React.useRef(null);

  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [ignoreTimeUpdates, setIgnoreTimeUpdates] = React.useState(false);

  const bind = useDrag(
    ({ xy, first, last, event }) => {
      event.preventDefault();

      if (first) {
        setIgnoreTimeUpdates(true);
      }

      const { seconds, progress } = getNewTimeProps(
        barRef.current.getBoundingClientRect(),
        xy[0],
        duration
      );

      if (last) {
        setTime(seconds);
        setIgnoreTimeUpdates(false);
        return;
      }

      setCurrentProgress(progress);
    },
    { event: { passive: false, capture: true } }
  );

  React.useEffect(() => {
    if (ignoreTimeUpdates) {
      return;
    }

    setCurrentProgress(progress);
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div
      className={`timebar ${className || ""}`}
      style={{ position: "relative", ...style }}
    >
      <div
        ref={barRef}
        className={cn(
          `timebar-bar`
          // `bg-gradient-to-tr from-[#3d858c] via-[#3d858c] to-[#737373_100%]`
        )}
        style={{
          background: `linear-gradient(to right, #3d858c 0%, #3d858c ${progress}%, #737373 ${progress}%, #737373 100%)`,
        }}
      />
      <div
        {...bind()}
        className={cn(`timebar-circle`)}
        style={{
          left: `${currentProgress}%`,
        }}
      />
      <div className="timebar-time-info">
        <div>{isSeeking ? "buffering..." : formatTime(currentTime)}</div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
}

export default TimeBar;
