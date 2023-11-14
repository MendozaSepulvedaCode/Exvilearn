import React, { useRef } from "react";
import CursoCard from "./CursoCard";
import "../../../estilos/inicio/cursoContainer.css";
import Cookies from "js-cookie";

function CursoRecomendadoContainer({ cursos, carrito, setCarrito }) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const currentPosition = scrollContainerRef.current.scrollLeft;
      const newPosition = currentPosition - 900;
      scrollToSmoothly(newPosition, 600);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const currentPosition = scrollContainerRef.current.scrollLeft;
      const newPosition = currentPosition + 900;
      scrollToSmoothly(newPosition, 600);
    }
  };

  const scrollToSmoothly = (position, duration) => {
    const startTime = performance.now();
    const start = scrollContainerRef.current.scrollLeft;
    const end = position;

    const animateScroll = (time) => {
      const elapsed = time - startTime;

      if (elapsed < duration) {
        scrollContainerRef.current.scrollLeft = easeInOut(
          elapsed,
          start,
          end - start,
          duration
        );
        requestAnimationFrame(animateScroll);
      } else {
        scrollContainerRef.current.scrollLeft = end;
      }
    };

    const easeInOut = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animateScroll);
  };

  const agregarAlCarrito = (curso) => {
    const existeEnCarrito = carrito.some((item) => item.id === curso.id);

    if (!existeEnCarrito) {
      const nuevoCarrito = [...carrito, curso];
      setCarrito(nuevoCarrito);
      Cookies.set("carrito", JSON.stringify(nuevoCarrito), { expires: 30 });
    } else {
    }
  };

  return (
    <div className="container-after-header">
      <div className="titulo-container">
        <h3 className="titulo-destacado">
          Explora nuestros{" "}
          <span className="texto-destacado">cursos más recientes</span> <br />y{" "}
          <span className="texto-destacado">expande tus conocimientos</span>
        </h3>
      </div>
      <div className="curso-container" ref={scrollContainerRef}>
        <div className="curso-list">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </div>
      <div className="scroll-buttons">
        <button id="boton-card-izquierda" onClick={scrollLeft}>
          &lt;
        </button>
        <button id="boton-card-derecha" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CursoRecomendadoContainer;
