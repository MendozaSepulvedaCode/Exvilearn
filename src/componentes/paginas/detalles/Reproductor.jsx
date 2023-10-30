import React, { useState } from "react";
import "../../../estilos/detalles/cursodetail.css";

const Reproductor = () => {
  return (
    <div className="video-container">
      <video controls className="video-player">
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
