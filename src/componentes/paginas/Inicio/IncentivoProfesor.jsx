import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../estilos/inicio/incentivo.css";
import {
  FaRegCommentDots,
  FaTeamspeak,
  FaConnectdevelop,
  FaMedapps,
} from "react-icons/fa";

const IncentivoProfesor = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

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
        <FaTeamspeak className="icono" style={{ backgroundColor: "rgba(102, 204, 255, 1)" }} />
      ),
      titulo: "Inspira y empodera",
      descripcion:
        "Ayuda a inspirar y empoderar a la próxima generación de estudiantes.",
    },
    {
      icono: (
        <FaMedapps className="icono" style={{ backgroundColor: "rgba(102, 255, 102, 1)" }} />
      ),
      titulo: "Construye un futuro brillante",
      descripcion:
        "Juntos podemos marcar la diferencia y construir un futuro más brillante a través del aprendizaje y la enseñanza.",
    },
  ];

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
        <button
          className="btn-unirse"
          onClick={() => navigateTo("/VistaEnseña")}
        >
          Únete como Profesor
        </button>
      </div>
      <div className="imagen-profesor"></div>
    </div>
  );
};

export default IncentivoProfesor;
