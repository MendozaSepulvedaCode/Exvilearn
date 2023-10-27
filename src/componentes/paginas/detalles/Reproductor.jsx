import React, { useState } from "react";
import "../../../estilos/detalles/cursodetail.css";
import { BsFillPlayFill } from "react-icons/bs";

const Reproductor = () => {
  const [showButton, setShowButton] = useState(true);

  const handlePlay = () => {
    const video = document.querySelector(".video-player");
    video.play();
    setShowButton(false);
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video controls className="video-player">
          <source
            src="https://storagexvilearn.blob.core.windows.net/videos/5837747187741467-obs_comprimido.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta videos
        </video>
      </div>
      {showButton && (
        <button className="play-button" onClick={handlePlay}>
          <BsFillPlayFill />
        </button>
      )}
    </div>
  );
};

export default Reproductor;
