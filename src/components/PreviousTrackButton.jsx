import React from "react";
import "./PreviousTrackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const PreviousTrackButton = props => {
  const handleClick = () => {
    props.onPreviousTrackButton();
  };

  return (
    <div className="PreviousTrackButton">
      <FontAwesomeIcon onClick={() => handleClick()} icon={faBackward} />
    </div>
  );
};

export default PreviousTrackButton;
