import React from "react";
import "./PlayButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

const PlayButton = props => {
  const { playing } = props;

  const handleClick = () => {
    props.onTogglePlayButton();
  };

  const playpause = () =>
    playing ? (
      <FontAwesomeIcon
        onClick={() => handleClick()}
        icon={faPauseCircle}
        size="5x"
      />
    ) : (
      <FontAwesomeIcon
        onClick={() => handleClick()}
        icon={faPlayCircle}
        size="5x"
      />
    );

  return <div className="PlayButton">{playpause()}</div>;
};

export default PlayButton;
