import React, { useState, useEffect } from "react";
import "../../estilos/panel/cursos.css";
import OverView from "./OverView";
import Footer from "../Footer/Footer";

function PanelCursos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-cursos">
      <OverView />
      {!isMobile && <Footer />}
    </div>
  );
}

export default PanelCursos;
