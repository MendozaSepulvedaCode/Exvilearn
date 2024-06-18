import React, { useState, useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiTimeLine, RiCheckLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { tiempoTranscurrido } from "../../../ayudas/tiempoTranscurrido";
import "../../../estilos/inicio/cursoContainer.css";

const CursoCard = ({ curso, agregarAlCarrito }) => {
  const [enCarrito, setEnCarrito] = useState({});

  useEffect(() => {
    const carritoFromCookie = Cookies.get("carrito");
    if (carritoFromCookie) {
      try {
        const parsedCarrito = JSON.parse(carritoFromCookie);
        const enCarritoObj = {};
        parsedCarrito.forEach((item) => {
          enCarritoObj[item.Detalles.Curso.ID_curso] = true;
        });
        setEnCarrito(enCarritoObj);
      } catch (error) {
        console.error("Error al analizar el valor de la cookie:", error);
      }
    }
  }, []);

  const manejoAgregarCarrito = () => {
    let carritoFromCookie = Cookies.get("carrito");

    if (carritoFromCookie) {
      try {
        carritoFromCookie = JSON.parse(carritoFromCookie);
      } catch (error) {
        console.error("Error al analizar el valor de la cookie:", error);
        carritoFromCookie = [];
      }
    } else {
      carritoFromCookie = [];
    }

    const existeEnCarrito = carritoFromCookie.some(
      (item) => item.ID_curso === curso.Detalles.Curso.ID_curso
    );

    if (!existeEnCarrito) {
      carritoFromCookie.push(curso);
      Cookies.set("carrito", JSON.stringify(carritoFromCookie));
      const updatedEnCarrito = {
        ...enCarrito,
        [curso.Detalles.Curso.ID_curso]: true,
      };
      setEnCarrito(updatedEnCarrito);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 800,
      });
    }
  };

  const navegaInfoCurso = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="curso-card">
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
          <span className="tag-text">
            {tiempoTranscurrido(curso.Detalles.Curso.FechaPubliBlob)}
          </span>
        </div>
        <div className="tag">
          <span className="tag-icon">
            <BsPeople />
          </span>
          <span className="tag-text">{curso.Detalles.Curso.participantes}</span>
        </div>
        <div className="tag">
          <span className="tag-icon">
            <BsBookmarks />
          </span>
          <span className="tag-text">
            {curso.Detalles.Curso.Secciones
              ? Object.keys(curso.Detalles.Curso.Secciones).length
              : 0}
          </span>
        </div>
      </div>
      <div className="avatar-name">
        <div className="avatar">
          <img src={curso.Detalles.Profesor.ProfeUrl} alt="Avatar" />
        </div>
        <div className="name">{`${curso.Detalles.Profesor.Nombre} ${curso.Detalles.Profesor.Apellido}`}</div>
      </div>
      <div className="curso-titulo">
        <p>{curso.Detalles.Curso.Titulo}</p>
      </div>
      <div className="card-end">
        <div className="price">
          COP {Number(curso.Detalles.Curso.Precio).toLocaleString()} $
        </div>
        <div className="botones">
          <Link
            to={`/detalle-curso/id/${curso.Detalles.Curso.ID_curso}`}
            onClick={navegaInfoCurso}
          >
            <button className="boton-comprar"> Ver más</button>
          </Link>
          <button onClick={manejoAgregarCarrito} className="boton-agregar">
            {enCarrito[curso.Detalles.Curso.ID_curso] ? (
              <RiCheckLine className="check-icon-card" />
            ) : (
              <HiOutlineShoppingCart className="cart-icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CursoCard;
