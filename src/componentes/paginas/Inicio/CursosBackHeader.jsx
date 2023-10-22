import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineComment,
  AiOutlineEnvironment,
  AiOutlineTeam,
  AiOutlineYoutube,
  AiOutlineSearch,
} from "react-icons/ai";
import "../../../estilos/inicio/tags.css";

function CursosBackHeader() {
  return (
    <div className="container-curso-back">
      <div className="tag-curso-back" >
        <span className="tag-icon-curso-back" style={{ backgroundColor: "#ff6961" }}>
          <AiOutlineCalendar />
        </span>
        <span className="tag-text-curso-back">Maneja tu tiempo</span>
      </div>
      <div className="tag-curso-back" >
        <span className="tag-icon-curso-back" style={{ backgroundColor: "#123f74" }}>
          <AiOutlineComment />
        </span>
        <span className="tag-text-curso-back">Comunicacion directa</span>
      </div>
      <div className="tag-curso-back" >
        <span className="tag-icon-curso-back" style={{ backgroundColor: "#147583" }}>
          <AiOutlineEnvironment />
        </span>
        <span className="tag-text-curso-back">Accede en cualquier lugar</span>
      </div>
      <div className="tag-curso-back" >
        <span className="tag-icon-curso-back" style={{ backgroundColor: "#f8bfae" }}>
          <AiOutlineTeam />
        </span>
        <span className="tag-text-curso-back">Rodeate de personas</span>
      </div>
      <div className="tag-curso-back" >
        <span className="tag-icon-curso-back" style={{ backgroundColor: "#862f27" }}>
          <AiOutlineYoutube />
        </span>
        <span className="tag-text-curso-back">Videos en alta calidad</span>
      </div>
      <div className="tag-curso-back">
        <span className="tag-icon-curso-back"  style={{ backgroundColor: "#f19a34" }}>
          <AiOutlineSearch />
        </span>
        <span className="tag-text-curso-back">Descubre tus intereses</span>
      </div>
    </div>
  );
}

export default CursosBackHeader;
