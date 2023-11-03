import React, { useState, useEffect } from "react";
import "../../../estilos/detalles/cursodetail.css";

let initialSeccionesData = [];

for (let i = 0; i < 15; i++) {
  initialSeccionesData.push({
    seccion: `Sección ${i + 1}`,
  });
}

function SeccionesInfo() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [seccionesState, setSeccionesState] = useState(initialSeccionesData);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const containerStyle = {
    marginTop: isNavVisible ? "0" : "-4rem",
  };

  return (
    <div className="seccion-acordion" style={containerStyle}>
      {initialSeccionesData.map((seccion, index) => (
        <div className="seccion-acordion-item" key={index}>
          <div
            className="seccion-acordion-title"
            onClick={() => handleClick(index)}
          >
            <div>{seccion.seccion} </div>
            <div>▶</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeccionesInfo;
