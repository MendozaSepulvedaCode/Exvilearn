import React from "react";
import "../../../estilos/inicio/incentivo.css";
import {
  FaRegCommentDots,
  FaTeamspeak,
  FaConnectdevelop,
  FaMedapps,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validarProfesor } from "../../../ayudas/validarprofesor";
import { useLoader } from "../../../ayudas/Loader";

const IncentivoProfesor = () => {
  const navigate = useNavigate();

  const aspectos = [
    {
      icono: (
        <FaConnectdevelop
          className="icono"
          style={{ backgroundColor: "rgba(255, 204, 0, 1)" }}
        />
      ),
      titulo: "Comparte tus conocimientos",
      descripcion:
        "Comparte tus conocimientos y experiencias con estudiantes de todo el mundo.",
    },
    {
      icono: (
        <FaRegCommentDots
          className="icono"
          style={{ backgroundColor: "rgba(255, 102, 0, 1)" }}
        />
      ),
      titulo: "Forma parte de una comunidad",
      descripcion:
        "Únete a nuestra comunidad de educadores apasionados y colabora con otros profesores.",
    },
    {
      icono: (
        <FaTeamspeak
          className="icono"
          style={{ backgroundColor: "rgba(102, 204, 255, 1)" }}
        />
      ),
      titulo: "Inspira y empodera",
      descripcion:
        "Ayuda a inspirar y empoderar a la próxima generación de estudiantes.",
    },
    {
      icono: (
        <FaMedapps
          className="icono"
          style={{ backgroundColor: "rgba(102, 255, 102, 1)" }}
        />
      ),
      titulo: "Construye un futuro brillante",
      descripcion:
        "Juntos podemos marcar la diferencia y construir un futuro más brillante a través del aprendizaje y la enseñanza.",
    },
  ];

  const { showLoader, hideLoader } = useLoader();

  const redireccionar = (ruta) => {
    navigate(ruta);
  };

  const manejoValidacion = async () => {
    showLoader();
    try {
      const resultado = await validarProfesor();

      if (typeof resultado.isValid === "undefined") {
        resultado.isValid = false;
      }

      if (!resultado.isValid) {
        redireccionar("/VistaEnseña");
        hideLoader();
      } else {
        redireccionar("/PanelCursos");
        hideLoader();
      }
    } catch (error) {
      console.error("Ocurrió un error durante la validación:", error);
      hideLoader();
    }
  };

  return (
    <div className="incentivo-profesor">
      <div className="contenido">
        <h5>
          ¿Por qué unirte como
          <span>Profesor</span>?
        </h5>
        <div className="aspectos">
          {aspectos.map((aspecto, index) => (
            <div className="aspecto" key={index}>
              {aspecto.icono}
              <div className="descripcion-aspectos">
                <h6>{aspecto.titulo}</h6>
                <p>{aspecto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        <Link onClick={() => window.scrollTo(0, 0)}>
          <button className="btn-unirse" onClick={manejoValidacion}>
            Únete como Profesor
          </button>
        </Link>
      </div>
      <div className="imagen-profesor"></div>
    </div>
  );
};

export default IncentivoProfesor;
