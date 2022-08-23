import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";

import VideoProgressBar from "./videoPlayerComponents/common/VideoProgressBar";
import AFrame360VideoSphere from "./videoPlayerComponents/360/AFrame360VideoSphere";
import AFrameCameraRig from "./videoPlayerComponents/common/AFrameCameraRig";
import AFrameVideoControls from "./videoPlayerComponents/common/AFrameVideoControls";

import throttle from "lodash/throttle";
import AFrameTheaterScene from "./videoPlayerComponents/theater/AFrameTheaterScene";

const AFrameVideoPlayer = ({ videoData, vrTheaterMode, preload = "auto" }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [videoPlayerMode, setVideoPlayerMode] = useState("window");
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [wasVideoStarted, setWasVideoStarted] = useState(false);

  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");
      setIsRendered(true);
    }
  }, []);

  const handlePlayVideo = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleMuteVideo = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
  };

  const logVideoActivity = (activity) => {
    const descriptionPerActivity = {
      start: "started watching",
      stop: "stopped watching",
      resume: "resumed watching",
    };

    if (!Object.keys(descriptionPerActivity).includes(activity)) {
      console.log(
        `logVideoActivity error: '${activity}' is not a valid activity.`
      );
      return;
    }
  };

  const handleVideoOnPlay = () => {
    setIsVideoPaused(false);

    if (!wasVideoStarted) {
      setWasVideoStarted(true);
      logVideoActivity("start");
    } else {
      logVideoActivity("resume");
    }
  };

  const handleVideoOnPause = () => {
    setIsVideoPaused(true);
    logVideoActivity("stop");
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    const progress = video.currentTime / video.duration;
    setVideoProgress(progress);
  };

  const throttledHandleVideoTimeUpdate = throttle(handleVideoTimeUpdate, 1000);

  const handleProgressBarProgressChange = (fillPercent) => {
    const video = videoRef.current;
    video.currentTime = fillPercent * video.duration;
  };

  const handleFullScreen = () => {
    if ("exitFullscreen" in document) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else {
      if (videoPlayerMode !== "fullscreen") {
        setVideoPlayerMode("fullscreen");
      } else {
        setVideoPlayerMode("window");
      }
    }
  };

  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setVideoPlayerMode("fullscreen");
    } else {
      setVideoPlayerMode("window");
    }
  };

  const handleEnterVR = () => {
    setVideoPlayerMode("vr");
  };
  const handleExitVR = () => {
    setVideoPlayerMode("window");
  };

  const show2D =
    (videoData.projection === "NONE" || videoData.projection === "AUTO") &&
    !vrTheaterMode;

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    container.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      if (video) {
        video.pause();
      }

      container.removeEventListener("fullscreenchange", handleFullscreenChange);
      logVideoActivity("stop");
      setVideoPlayerMode("window");
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (scene) {
      scene.addEventListener("enter-vr", handleEnterVR);
      scene.addEventListener("exit-vr", handleExitVR);
    }
    return () => {
      if (scene) {
        scene.pause();
        scene.removeEventListener("enter-vr", handleEnterVR);
        scene.removeEventListener("exit-vr", handleExitVR);
      }
    };
  }, [show2D, isRendered]);

  const videoHTML = (
    <video
      id="video-src"
      ref={videoRef}
      src={videoData.sources[0].src}
      crossOrigin="anonymous"
      preload={preload}
      autoload="true"
      playsInline
      webkit-playsinline="true"
      onPause={handleVideoOnPause}
      onPlay={handleVideoOnPlay}
      onVolumeChange={() => {
        setIsVideoMuted(videoRef.current.muted);
      }}
      onTimeUpdate={() => {
        throttledHandleVideoTimeUpdate();
      }}
    />
  );

  return (
    <div
      ref={containerRef}
      className={
        "theaterVideo techrow-player-theme " +
        (videoPlayerMode === "window"
          ? "aframe-theatre container-fluid"
          : "aframe-theatre-fullscreen")
      }
    >
      {!wasVideoStarted && videoData.poster && (
        <img
          src={videoData.poster}
          alt={videoData.title}
          className="aframe-screensaver-image"
        />
      )}

      {isRendered && (
        <>
          {show2D ? (
            videoHTML
          ) : (
            <a-scene
              ref={sceneRef}
              embedded
              background="color: black"
              loading-screen="dotsColor: green; backgroundColor: black"
              vr-mode-ui="enterVRButton: #enter-vr"
              vr-ios-video-fix="video: #video-src"
              embedded-window-fix="camera: #scene-camera"
            >
              <a-assets>{videoHTML}</a-assets>

              <AFrameCameraRig
                cameraId="scene-camera"
                cursorId="scene-cursor"
              />

              {typeof window !== "undefined" &&
                (vrTheaterMode ? (
                  <AFrameTheaterScene
                    videoSelector="#video-src"
                    cursorSelector="#scene-cursor"
                  />
                ) : (
                  <AFrame360VideoSphere
                    projection={videoData.projection}
                    videoSelector="#video-src"
                    cursorSelector="#scene-cursor"
                  />
                ))}

              <AFrameVideoControls
                videoSelector="#video-src"
                position={vrTheaterMode ? "0 -2 -7" : "0 -2 -1"}
              />
            </a-scene>
          )}

          {/* HTML Player Controls */}
          <div
            id="control-html"VrIcon
            className={`aframe-html-control ${
              videoPlayerMode === "vr" ? "invisible" : "visible"
            }`}
          >
            <button
              id="control-html-play"
              className={`aframe-btn round ${
                isVideoPaused ? "vjs-icon-play" : "vjs-icon-pause"
              }`}
              onClick={handlePlayVideo}
            />
            <button
              id="control-html-volume"
              className={`aframe-btn round ${
                isVideoMuted ? "vjs-icon-volume-mute" : "vjs-icon-volume-high"
              }`}
              onClick={handleMuteVideo}
            />
            <VideoProgressBar
              progress={videoProgress}
              onProgressChange={handleProgressBarProgressChange}
            />
            <button
              id="enter-vr"
              className={cn("vr-btn aframe-btn round d-none", {
                "d-inline-block": !show2D,
              })}
            >
             {/*  <VrIcon /> */}
            </button>
            <button
              id="enter-fullscreen"
              className={
                "aframe-btn round " +
                (videoPlayerMode === "fullscreen"
                  ? "vjs-icon-fullscreen-exit"
                  : "vjs-icon-fullscreen-enter")
              }
              onClick={handleFullScreen}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AFrameVideoPlayer;
