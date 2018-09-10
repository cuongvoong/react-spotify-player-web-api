import React from "react";
import "./AlbumArt.css";

const AlbumArt = props => {
  const { albumImage } = props;
  return (
    <div className="AlbumArt">
      <img src={albumImage} alt="" />
    </div>
  );
};

export default AlbumArt;
