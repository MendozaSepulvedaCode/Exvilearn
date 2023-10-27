import React, { useState } from "react";
import "../../../estilos/detalles/cursodetail.css";

const seccionesData = [];

for (let i = 0; i < 20; i++) {
  seccionesData.push({
    seccion: `Sección ${i + 1}`,
    subsecciones: [
      `Subsección ${i + 1}.1`,
      `Subsección ${i + 1}.2`,
      `Subsección ${i + 1}.3`,
    ],
  });
}

function SeccionesInfo() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="seccion-acordion">
      {seccionesData.map((seccion, index) => (
        <div className="seccion-acordion-item" key={index}>
          <div
            className="seccion-acordion-title"
            onClick={() => handleClick(index)}
          >
            {seccion.seccion}
          </div>
          {activeIndex === index && (
            <div className="seccion-acordion-content">
              <ul>
                {seccion.subsecciones.map((subseccion, subIndex) => (
                  <li key={subIndex}>{subseccion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SeccionesInfo;
