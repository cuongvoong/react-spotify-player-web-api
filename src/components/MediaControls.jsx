import React from "react";
import "./MediaControls.css";
import PlayButton from "./PlayButton";
import PreviousTrackButton from "./PreviousTrackButton";
import NextTrackButton from "./NextTrackButton";

const MediaControls = props => {
  const {
    playing,
    onPreviousTrackButton,
    onTogglePlayButton,
    onNextTrackButton
  } = props;
  return (
    <div className="MediaControls">
      <PreviousTrackButton onPreviousTrackButton={onPreviousTrackButton} />
      <PlayButton onTogglePlayButton={onTogglePlayButton} playing={playing} />
      <NextTrackButton onNextTrackButton={onNextTrackButton} />
    </div>
  );
};

export default MediaControls;
