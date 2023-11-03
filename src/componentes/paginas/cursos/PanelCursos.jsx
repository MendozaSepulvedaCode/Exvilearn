import React from "react";
import "../../../estilos/cursos/cursoUsuario.css";
import { Link } from "react-router-dom";
import { AiOutlineInbox } from "react-icons/ai";
import { BiPlay } from "react-icons/bi";
import Swal from "sweetalert2";

function PanelCursos() {
  const cursos = [];
  for (let i = 1; i <= 4; i++) {
    cursos.push({
      id: i,
      nombre: `Primeros pasos en el trading  ${i}`,
      propietario: `Jose Mendoza ${i}`,
      imagen:
        "https://www.tradingybolsaparatorpes.com/wp-content/uploads/2022/10/Curso-de-Trading-Gratis.jpg",
    });
  }

  const calificarClick = () => {
    Swal.fire({
      title: "Calificar",
      html: `<div>
              <p>¿Cómo calificarías este curso?</p>
              <div id="rating" class="stars">
                <span class="star-panel" data-value="1">&#9734;</span>
                <span class="star-panel" data-value="2">&#9734;</span>
                <span class="star-panel" data-value="3">&#9734;</span>
                <span class="star-panel" data-value="4">&#9734;</span>
                <span class="star-panel" data-value="5">&#9734;</span>
              </div>
            </div>`,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#107acc",
      cancelButtonColor: "#ff4040",
    }).then((result) => {
      if (result.isConfirmed) {
        const rating = result.value;
        // console.log("Calificación enviada:", rating);
      }
    });

    const stars = document.querySelectorAll(".star-panel");

    stars.forEach((star) => {
      star.addEventListener("mouseover", (event) => {
        const value = event.target.getAttribute("data-value");
        fillStars(stars, value);
      });

      star.addEventListener("mouseout", () => {
        fillStars(stars, 0);
      });

      star.addEventListener("click", (event) => {
        const rating = event.target.getAttribute("data-value");
        Swal.clickConfirm();
        Swal.close();
        // console.log("Calificación enviada:", rating);
      });
    });
  };

  // Función para llenar las estrellas
  const fillStars = (stars, value, hover) => {
    stars.forEach((star, index) => {
      if (hover) {
        if (index < value) {
          star.innerHTML = "&#9733;";
          star.style.color = "#f39c12";
        } else {
          star.innerHTML = "&#9734;";
          star.style.color = "#000";
        }
      } else {
        if (index < value) {
          star.innerHTML = "&#9733;";
          star.style.color = "#f39c12";
        } else {
          star.innerHTML = "&#9734;";
          star.style.color = "#000";
        }
      }
    });
  };

  return (
    <div className="container-panel-curso-usuario">
      <div className="header-info-panel-usuarios">
        <h5>Mis cursos</h5>
        <button>Filtrar por</button>
      </div>
      {cursos.length === 0 ? (
        <div className="empty-cursos-panel">
          <AiOutlineInbox style={{ fontSize: "20em", color: "#e9e9e9" }} />
          <p>No hay cursos disponibles</p>
        </div>
      ) : (
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div key={curso.id} className="curso-card-panel">
              <Link to={`/detalle-curso`} className="link-to-curso">
                <div className="image-preview-panel">
                  <img
                    src={curso.imagen}
                    alt={curso.nombre}
                    className="imagen-panel-curso"
                  />
                  <span className="play-button-panel">
                    <BiPlay />
                  </span>
                  <div className="progress-bar-panel">
                    <div
                      className="progress-panel"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>
                <div className="info-curso-usuario">
                  <span className="curso-name-panel">{curso.nombre}</span>
                  <span className="curso-prop-panel">{curso.propietario}</span>
                </div>
              </Link>
              <button className="btn-calificar" onClick={calificarClick}>
                Calificar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PanelCursos;
