import React, { useState, useEffect, useRef } from "react";
import "../../../estilos/detalles/cursodetail.css";
import { useLoader } from "../../../ayudas/Loader";
import { BiPlay } from "react-icons/bi";

const Reproductor = () => {
  const { showLoader, hideLoader } = useLoader();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [playButtonVisible, setPlayButtonVisible] = useState(true);
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
      setControlsVisible(true);
      setPlayButtonVisible(false);
    } else {
      video.pause();
      setControlsVisible(true);
      setPlayButtonVisible(true);
    }
  };

  const handleRecord = () => {
    const videoOverlay = document.querySelector(".video-overlay");
    videoOverlay.style.display = "block";
  };

  useEffect(() => {
    const video = videoRef.current;
    video.setAttribute("disablePictureInPicture", "true");

    const updateButtonVisibility = () => {
      setPlayButtonVisible(video.paused);
    };

    const checkRecording = () => {
      const videoOverlay = document.querySelector(".video-overlay");
      if (document.pictureInPictureElement) {
        videoOverlay.style.display = "block";
      } else {
        videoOverlay.style.display = "none";
      }
    };

    document.addEventListener("fullscreenchange", checkRecording);

    if (videoLoaded) {
      hideLoader();
      video.addEventListener("play", updateButtonVisibility);
      video.addEventListener("pause", updateButtonVisibility);

      return () => {
        video.removeEventListener("play", updateButtonVisibility);
        video.removeEventListener("pause", updateButtonVisibility);
        document.removeEventListener("fullscreenchange", checkRecording);
      };
    }
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
            <BiPlay />
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
        <source
          src="https://storagexvilearn.blob.core.windows.net/videos/5837747187741467-obs_comprimido.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta videos
      </video>
    </div>
  );
};

export default Reproductor;
