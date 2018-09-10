import React from "react";
import "./ProgressControls.css";
import SimpleSlider from "./SimpleSlider";

const ProgressControls = props => {
  const { position, duration } = props;

  const progress = duration === 0 ? 0 : (position / duration) * 100;

  const formattedTime = time => {
    const date = new Date(null);
    date.setMilliseconds(time);

    const hours = date.toISOString().substr(11, 2);
    const minutes = date.toISOString().substr(14, 2);
    const seconds = date.toISOString().substr(17, 2);

    if (hours === "00") {
      // Only show single digit minutes if less than 10
      if (minutes < 10) {
        return `${minutes.substr(1, 1)}:${seconds}`;
      } else {
        return `${minutes}:${seconds}`;
      }
    } else {
      // Only show single digit hours if less than 10
      if (hours < 10) {
        return `${hours.substr(1, 1)}:${minutes}:${seconds}`;
      } else {
        return `${hours}:${minutes}:${seconds}`;
      }
    }
  };

  return (
    <div className="ProgressControls">
      <div className="slider">
        <SimpleSlider
          progress={progress}
          position={position}
          duration={duration}
          onChangePosition={props.onChangePosition}
        />
      </div>
      <div className="play-times">
        <div className="time-position">{formattedTime(position)}</div>
        <div className="time-duration">{formattedTime(duration)}</div>
      </div>
    </div>
  );
};

export default ProgressControls;
