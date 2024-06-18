import React, { useState, useEffect, useRef } from "react";
import { useLoader } from "../../../ayudas/Loader";
import { BiPlay } from "react-icons/bi";

const Reproductor = ({ selectedVideo }) => {
  const { showLoader, hideLoader } = useLoader();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [playButtonVisible, setPlayButtonVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    if (!videoLoaded) {
      showLoader();
      setVideoLoaded(true);
    }
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setControlsVisible(true);
      setPlayButtonVisible(false);
    } else {
      video.pause();
      setIsPlaying(false);
      setControlsVisible(true);
      setPlayButtonVisible(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    video.src = selectedVideo;

    if (selectedVideo) {
      const video = videoRef.current;
      video.src = selectedVideo;
      video.pause();
      setControlsVisible(true);
      setPlayButtonVisible(true);
    }
  }, [selectedVideo]);

  useEffect(() => {
    const video = videoRef.current;

    if (videoLoaded) {
      hideLoader();
    }

    const updateButtonVisibility = () => {
      setPlayButtonVisible(video.paused);
    };

    video.addEventListener("play", updateButtonVisibility);
    video.addEventListener("pause", updateButtonVisibility);

    return () => {
      video.removeEventListener("play", updateButtonVisibility);
      video.removeEventListener("pause", updateButtonVisibility);
    };
  }, [videoLoaded, hideLoader]);

  return (
    <div
      className="video-container"
      onMouseOver={() => setControlsVisible(true)}
      onMouseOut={() => setControlsVisible(false)}
    >
      {playButtonVisible && (
        <div className="custom-video-controls">
          <button className="custom-play-button" onClick={handlePlay}>
            <BiPlay className="play-icon-video" />
          </button>
        </div>
      )}
      <div className="video-overlay"></div>
      <video
        ref={videoRef}
        className="video-player"
        onCanPlay={handleVideoLoad}
        controls={controlsVisible}
      >
        <source src={selectedVideo} type="video/mp4" />
        Tu navegador no soporta videos
      </video>
    </div>
  );
};

export default Reproductor;
