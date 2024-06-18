import React, { useState, useEffect } from "react";
import "../../../estilos/categorias/categorias.css";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../ayudas/Loader";
import { AiOutlinePlus, AiOutlineInbox } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiTimeLine, RiCheckLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import { Link } from "react-router-dom";

function VistaCategorias({ cursos }) {
  const [cursosCategoria, setCursosCategoria] = useState([]);
  const { categoria } = useParams();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader();

    if (categoria && Array.isArray(cursos)) {
      const capitalizedCategoria =
        categoria.charAt(0).toUpperCase() + categoria.slice(1);

      const cursosFiltrados = cursos.filter(
        (curso) => curso.Detalles.Curso.Categoria === capitalizedCategoria
      );

      setCursosCategoria(cursosFiltrados);
      hideLoader();
    } else {
      setCursosCategoria([]);
      hideLoader();
    }
  }, [cursos, categoria, showLoader, hideLoader]);

  const renderCursos = () => {
    return cursosCategoria.map((curso) => (
      <div
        key={curso.Detalles.Curso.ID_curso}
        className="curso-card card-categoria"
      >
        <div className="image-container">
          <img
            src={curso.Detalles.Curso.Miniatura}
            alt={curso.Detalles.Curso.Titulo}
            className="image"
          />
          <div className="category-label">{curso.Detalles.Curso.Categoria}</div>
        </div>
        <div className="tags">
          <div className="tag">
            <span className="tag-icon">
              <RiTimeLine />
            </span>
            <span className="tag-text">{curso.Detalles.Curso.duracion}</span>
          </div>
          <div className="tag">
            <span className="tag-icon">
              <BsPeople />
            </span>
            <span className="tag-text">
              {curso.Detalles.Curso.participantes}
            </span>
          </div>
          <div className="tag">
            <span className="tag-icon">
              <BsBookmarks />
            </span>
            <span className="tag-text">
              {curso.Detalles.Curso.Secciones.length}
            </span>
          </div>
        </div>
        <div className="avatar-name">
          <div className="avatar">
            <img src={curso.Detalles.Curso.Miniatura} alt="Avatar" />
          </div>
          <div className="name">{`${curso.Detalles.Profesor.Nombre} ${curso.Detalles.Profesor.Apellido}`}</div>
        </div>
        <div className="curso-titulo">
          <p>{curso.Detalles.Curso.Titulo}</p>
        </div>
        <div className="card-end">
          <div className="price">
            {" "}
            COP {Number(curso.Detalles.Curso.Precio).toLocaleString()} $
          </div>
          <div className="botones">
            <Link
              to={`/detalle-curso/id/${curso.Detalles.Curso.ID_curso}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <button className="boton-comprar"> Ver más</button>
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container-info-categorias-right">
      <div className="cursos-container-categorias">
        {cursosCategoria.length > 0 ? (
          renderCursos()
        ) : (
          <div className="empty-data-content">
            <AiOutlineInbox style={{ fontSize: "20em", color: "#d3d3d3" }} />
            <p>Aun no hay cursos disponibles {}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VistaCategorias;
