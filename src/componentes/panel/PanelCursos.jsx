import React, { useState } from "react";
import "../../estilos/panel/cursos.css";
import OverView from "./OverView";
import Footer from '../Footer/Footer'

function PanelCursos() {
  return (
    <div className="container-cursos">
      <OverView />
      <Footer />
    </div>
  );
}

export default PanelCursos;
