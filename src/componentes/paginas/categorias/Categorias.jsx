import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import VistaCategorias from "./VistaCategorias";
import Sort from "./Sort";
import { useLoader } from "../../../ayudas/Loader";
import { useParams } from "react-router-dom";
import "../../../estilos/categorias/categorias.css";

function Categorias({ cursos }) {
  const { showLoader, hideLoader } = useLoader();
  const [cursoInfo, setCursoInfo] = useState(null);
  const { categoria } = useParams();

  const formatCategory = (category) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formattedCategory = categoria ? formatCategory(categoria) : "";

  useEffect(() => {
    showLoader();

    if (categoria && Array.isArray(cursos)) {
      const selectedCourse = cursos.filter(
        (curso) => curso.Detalles.Curso.Categoria === categoria
      );

      if (selectedCourse.length > 0) {
        setCursoInfo(selectedCourse[0]);
      } else {
        setCursoInfo(null);
      }

      hideLoader();
    } else {
      setCursoInfo(null);
      hideLoader();
    }
  }, [cursos, categoria, showLoader, hideLoader]);

  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <div className="container-full-categorias">
        <div className="header-categorias">
          <h5>Cursos de {formattedCategory}</h5>
          <button>Filtrar por</button>
        </div>
        <div className="container-categorias">
          <Sort />
          <VistaCategorias cursos={cursos} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categorias;
