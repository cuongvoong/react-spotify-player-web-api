import React from "react";
import "./MediaPanel.css";
import ProgressControls from "./ProgressControls";
import MediaControls from "./MediaControls";

const MediaPanel = props => {
  const {
    albumName,
    trackName,
    artistName,
    playing,
    position,
    duration,
    onPreviousTrackButton,
    onTogglePlayButton,
    onNextTrackButton
  } = props;
  return (
    <div className="MediaPanel">
      <ProgressControls
        position={position}
        duration={duration}
        onChangePosition={props.onChangePosition}
      />
      <div className="trackName">{trackName}</div>
      <div className="artistName">{artistName}</div>
      <div className="albumName">{albumName}</div>
      <MediaControls
        playing={playing}
        onPreviousTrackButton={onPreviousTrackButton}
        onTogglePlayButton={onTogglePlayButton}
        onNextTrackButton={onNextTrackButton}
      />
    </div>
  );
};

export default MediaPanel;
