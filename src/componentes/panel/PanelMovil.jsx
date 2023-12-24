import React from "react";
import { FaMobileAlt, FaBan } from "react-icons/fa";
import "../../estilos/panel/overview.css";

function PanelMovil() {
  return (
    <div className="panel-movil">
      <h3 style={{ marginBottom: "20px", fontSize: "1.5em" }}>
        Esta vista está optimizada para monitores
      </h3>
      <div
        style={{ fontSize: "4.5em", marginBottom: "20px", color: "#107acc" }}
      >
        <FaMobileAlt style={{ marginRight: "10px" }} />
        <FaBan />
      </div>
      <p>Por favor, ingrese desde un computador o tablet</p>
    </div>
  );
}

export default PanelMovil;
