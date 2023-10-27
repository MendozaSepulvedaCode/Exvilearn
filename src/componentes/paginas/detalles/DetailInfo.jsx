import React from "react";
import "../../../estilos/detalles/cursodetail.css";

function DetailInfo() {
  return (
    <div className="detail-info-container">
      <h2>Información del Curso</h2>
      <div className="info-section">
        <h3>Descripción</h3>
        <p>Descripción del curso va aquí</p>
      </div>
      <div className="info-section">
        <h3>Fecha de Inicio</h3>
        <p>Fecha de inicio del curso va aquí</p>
      </div>
      <div className="info-section">
        <h3>Duración</h3>
        <p>Duración del curso va aquí</p>
      </div>
      <div className="info-section">
        <h3>Instructor</h3>
        <p>Nombre del instructor va aquí</p>
      </div>
    </div>
  );
}

export default DetailInfo;
