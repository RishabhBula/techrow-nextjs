import React, { useEffect, useState } from "react";
// import AFrameVideoPlayer from "../Theater/AFrameVideoPlayer";

const VideoContainer = ({
  bannerClassName,
  imageClassName,
  videoText,
  videoUrl,
  previewImage,
  videoHeadline,
  videoDescription,
  isText,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const handlePlayPause = () => {
    const vid = document.getElementById("video");
    vid.play();
    setIsVideoPlaying(true);
  };
  useEffect(() => {
    if (videoUrl) {
      const vid = document.getElementById("video");
      var source = document.createElement("source");
      source.setAttribute("src", `https:${videoUrl}`);
      source.setAttribute("type", "video/mp4");
      vid.appendChild(source);
      vid.load();
    }
  }, [videoUrl]);

  const handleVideoSeeking = () => {
    const vid = document.getElementById("video");
    setIsVideoPlaying(true);
    vid.play();
  };

  return (
    <div className={bannerClassName}>
      {!isVideoPlaying ? (
        !isText ? (
          <img
            src={videoText ? `https:${videoText}` : null}
            alt=""
            className={imageClassName}
          />
        ) : (
          <div className="class-detail">
            <div>
              <h3 className="class-title">
                {videoHeadline ? videoHeadline : null}
              </h3>
            </div>
            <hr />
            <div>
              <h5 className="class-desc">
                {videoDescription ? videoDescription : null}
              </h5>
            </div>
          </div>
        )
      ) : null}
      <video
        controls={isVideoPlaying}
        poster={previewImage ? `https:${previewImage}` : null}
        id={"video"}
        onError={(error) => console.log("Error", error)}
        onPause={() => setIsVideoPlaying(false)}
        onSeeking={() => handleVideoSeeking()}
      >
        <source
          id={"videoSource"}
          src={videoUrl ? `https:${videoUrl}` : null}
        />
      </video>
      {!isVideoPlaying ? (
        <div className="playpause" onClick={handlePlayPause} />
      ) : null}
    </div>
  );
};
export default VideoContainer;
