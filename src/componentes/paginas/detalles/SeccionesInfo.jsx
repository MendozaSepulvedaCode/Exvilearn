import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp, BsFillPlayFill } from "react-icons/bs";
import "../../../estilos/detalles/cursodetail.css";

let initialSeccionesData = [];

for (let i = 0; i < 8; i++) {
  initialSeccionesData.push({
    seccion: `Sección ${i + 1}`,
    subsecciones: [
      { title: `Subsección ${i + 1}.1`, completed: false },
      { title: `Subsección ${i + 1}.2`, completed: false },
      { title: `Subsección ${i + 1}.3`, completed: false },
    ],
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

  const countCompletedSubsections = (subsections) => {
    return subsections.filter((subseccion) => subseccion.completed).length;
  };

  const handleCheckboxChange = (seccionIndex, subseccionIndex) => {
    const updatedData = [...seccionesState];
    updatedData[seccionIndex].subsecciones[subseccionIndex].completed =
      !updatedData[seccionIndex].subsecciones[subseccionIndex].completed;
    setSeccionesState(updatedData);
  };

  return (
    <div className="seccion-acordion" style={containerStyle}>
      {initialSeccionesData.map((seccion, index) => (
        <div className="seccion-acordion-item" key={index}>
          <div
            className="seccion-acordion-title"
            onClick={() => handleClick(index)}
          >
            <div>
              <div>{seccion.seccion}</div>{" "}
              <div className="secciones-count">
                {countCompletedSubsections(seccion.subsecciones)} /{" "}
                {seccion.subsecciones.length}
              </div>
            </div>
            {activeIndex === index ? (
              <BsChevronUp className="icon-section-course" />
            ) : (
              <BsChevronDown className="icon-section-course" />
            )}
          </div>
          {activeIndex === index && (
            <div className="seccion-acordion-content">
              <ul>
                {seccion.subsecciones.map((subseccion, subIndex) => (
                  <li key={subIndex} className="subseccion-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={subseccion.completed}
                        onChange={() => handleCheckboxChange(index, subIndex)}
                      />
                      {subseccion.title}
                    </label>
                    <BsFillPlayFill className="video-icon" />
                  </li>
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
