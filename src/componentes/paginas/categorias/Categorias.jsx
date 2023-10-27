import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import VistaCategorias from "./VistaCategorias";
import Sort from "./Sort";
import { useLoader } from "../../../ayudas/Loader";
import "../../../estilos/categorias/categorias.css";

function Categorias() {
  const { showLoader, hideLoader } = useLoader();

  const handleFiltrarClick = () => {
    showLoader();

    setTimeout(() => {
      hideLoader();
    }, 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <div className="container-full-categorias">
        <div className="header-categorias">
          <h5>Cursos de Programacion</h5>
          <button onClick={handleFiltrarClick}>Filtrar por</button>
        </div>
        <div className="container-categorias">
          <Sort />
          <VistaCategorias />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categorias;
