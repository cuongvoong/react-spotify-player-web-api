import React from "react";
import "./NextTrackButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

const NextTrackButton = props => {
  const handleClick = () => {
    props.onNextTrackButton();
  };

  return (
    <div className="NextTrackButton">
      <FontAwesomeIcon onClick={() => handleClick()} icon={faForward} />
    </div>
  );
};

export default NextTrackButton;
