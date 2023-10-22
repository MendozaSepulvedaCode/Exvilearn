import React, { useState, useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiTimeLine, RiCheckLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { BsBookmarks } from "react-icons/bs";
import Cookies from "js-cookie";
import "../../../estilos/inicio/cursoContainer.css";

const CursoCard = ({ curso, agregarAlCarrito }) => {
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    const carritoFromCookie = Cookies.get("carrito");
    if (carritoFromCookie) {
      try {
        const parsedCarrito = JSON.parse(carritoFromCookie);
        if (parsedCarrito.some((item) => item.id === curso.id)) {
          setAgregado(true);
        }
      } catch (error) {
        console.error("Error al analizar el valor de la cookie:", error);
      }
    }
  }, [curso]);

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
      (item) => item.id === curso.id
    );

    if (!existeEnCarrito) {
      carritoFromCookie.push(curso);
      Cookies.set("carrito", JSON.stringify(carritoFromCookie));
    }

    setAgregado(true);
  };

  return (
    <div className="curso-card">
      <div className="image-container">
        <img src={curso.imagen} alt={curso.titulo} className="image" />
        <div className="category-label">{curso.categoria}</div>
      </div>
      <div className="tags">
        <div className="tag">
          <span className="tag-icon">
            <RiTimeLine />
          </span>
          <span className="tag-text">{curso.duracion}</span>
        </div>
        <div className="tag">
          <span className="tag-icon">
            <BsPeople />
          </span>
          <span className="tag-text">{curso.participantes}</span>
        </div>
        <div className="tag">
          <span className="tag-icon">
            <BsBookmarks />
          </span>
          <span className="tag-text">{curso.lesiones}</span>
        </div>
      </div>
      <div className="avatar-name">
        <div className="avatar">
          <img src={curso.avatar} alt="Avatar" />
        </div>
        <div className="name">{curso.nombre}</div>
      </div>
      <div className="curso-titulo">
        <p>{curso.titulo}</p>
      </div>
      <div className="card-end">
        <div className="price">{curso.precio}</div>
        <div className="botones">
          <button className="boton-comprar">Ver mas</button>
          <button onClick={manejoAgregarCarrito} className="boton-agregar">
            {agregado ? (
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
