import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "../../../estilos/detalles/cursodetail.css";

function SeccionesInfo({ cursos, handleSectionClick }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [cursoInfo, setCursoInfo] = useState(null);
  const { id } = useParams();

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleToggleNav = () => {
    const accordion = document.querySelector(".seccion-acordion");
    const toggleButton = document.querySelector(".toggle-button");

    if (!isNavVisible) {
      accordion.classList.add("show");
      toggleButton.classList.add("expanded");
    } else {
      accordion.classList.remove("show");
      toggleButton.classList.remove("expanded");
    }

    setIsNavVisible(!isNavVisible);
  };

  const getLastDigit = (ID_Seccion) => {
    const lastDashIndex = ID_Seccion.lastIndexOf("-");
    const lastDigit = ID_Seccion.substring(lastDashIndex + 1);
    return parseInt(lastDigit);
  };

  useEffect(() => {
    const toggleButton = document.querySelector(".toggle-button");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavVisible(false);
        toggleButton.classList.remove("expanded");
      } else {
        setIsNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const selectedCourse = cursos.find(
        (curso) => curso.Detalles.Curso.ID_curso === id
      );

      if (selectedCourse) {
        setCursoInfo(selectedCourse);
      }
    }
  }, [cursos, id]);

  const containerStyle = {
    marginTop: isNavVisible ? "0" : "-4rem",
  };

  return (
    <>
      <button
        className={`toggle-button ${isNavVisible ? "expanded" : ""}`}
        onClick={handleToggleNav}
      >
        <span className="arrow-icon">
          <FaLongArrowAltLeft />
        </span>
      </button>

      <div
        className={`seccion-acordion ${isNavVisible ? "show" : ""}`}
        style={containerStyle}
      >
        {cursoInfo && cursoInfo.Detalles.Curso.Secciones ? (
          Object.entries(cursoInfo.Detalles.Curso.Secciones)
            .sort(
              ([keyA, valueA], [keyB, valueB]) =>
                getLastDigit(valueA.ID_Seccion) -
                getLastDigit(valueB.ID_Seccion)
            )
            .map(([seccion, seccionInfo], index) => (
              <div className="seccion-acordion-item" key={index}>
                <div
                  className={`seccion-acordion-title ${
                    activeIndex === index ? "active-section" : ""
                  }`}
                  onClick={() => handleSectionClick(seccion)}
                >
                  <div>{seccion}</div>
                  <div>▶</div>
                </div>
              </div>
            ))
        ) : (
          <div>No se encontraron secciones</div>
        )}
      </div>
    </>
  );
}

export default SeccionesInfo;
