import React from "react";
import ReactPlayer from "react-player";

const VideoLectureDisplay = ({ url }) => {
  return (
    <div className="relative  rounded-lg w-full h-auto">
      <ReactPlayer
        url={url}
        className="w-full h-full"
        width="200px"
        height="200px"
        controls={true} // Enable default controls
        playing={false} // Optional: control auto-play
      />
    </div>
  );
};

export default VideoLectureDisplay;
