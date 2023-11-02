import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import "../../../estilos/detalles/cursodetail.css";

function DetailInfo() {
  const [activeTab, setActiveTab] = useState("descripcion");

  const valoracionesGenerales = [
    { estrellas: 5, porcentaje: 60 },
    { estrellas: 4, porcentaje: 10 },
    { estrellas: 3, porcentaje: 20 },
    { estrellas: 2, porcentaje: 8 },
    { estrellas: 1, porcentaje: 2 },
  ];

  const infoCurso = [
    {
      subtitulo: "Duracion del curso",
      lista: "20hr en total",
    },
    {
      subtitulo: "Descripcion",
      lista:
        "En esta sección, abordaremos en detalle cada uno de los aspectos clave relacionados con la creación de tu curso en Exvilearn. Desde la selección del tema y la identificación de tu audiencia hasta la filmación y edición de videos de alta calidad, aprenderás los pasos esenciales para asegurar que tu curso cumpla con los estándares de calidad de Exvilearn. También te proporcionaremos estrategias efectivas para posicionar y promocionar tu curso en el marketplace de Exvilearn, junto con valiosos consejos didácticos para mejorar continuamente tu oferta educativa. Además, te brindaremos una visión profunda del proceso de revisión de Exvilearn y te orientaremos sobre cómo realizar ajustes y mejoras en tu curso una vez que esté publicado. Al completar esta sección, tendrás una comprensión integral de los componentes fundamentales necesarios para tener éxito como instructor en la plataforma Exvilearn.",
    },

    {
      subtitulo: "Secciones",
      lista: "10 secciones en total",
    },
  ];

  const reseñas = [
    {
      imagen:
        "https://storagexvilearn.blob.core.windows.net/imagenes/13877441320054662-joven.png",
      nombre: "Jose Mendoza",
      valoracion: 4,
      tiempo: "Hace 2 días",
      info: "Me parecio un curso muy interesate, lo recomiendo",
    },
    {
      imagen:
        "https://storagexvilearn.blob.core.windows.net/imagenes/1490045135360789-4016740631645548-pngtree-d-rendering-male-character-profile-or-avatar-happy-young-man-with-png-image_4513590.png",
      nombre: "Usuario 2",
      valoracion: 5,
      tiempo: "Hace 5 días",
      info: "Es un curso para iniciar. Esta bien",
    },
  ];

  const promedio = (
    valoracionesGenerales.reduce((acc, valoracion) => {
      return acc + valoracion.estrellas * valoracion.porcentaje;
    }, 0) / 100
  ).toFixed(1);

  const [valoracionPromedio, setValoracionPromedio] = useState("");

  const generarEstrellas = (cantidad) => {
    const estrellas = [];
    for (let i = 0; i < cantidad; i++) {
      estrellas.push(<FaStar key={i} className="star" />);
    }
    return estrellas;
  };

  useEffect(() => {
    const stars = [];
    const integerPart = Math.floor(promedio);
    const decimalPart = promedio - integerPart;

    for (let i = 0; i < integerPart; i++) {
      stars.push(<FaStar key={i} className="star" />);
    }

    if (decimalPart >= 0.5) {
      stars.push(<FaStar key={5} className="star" />);
    } else if (decimalPart > 0 && decimalPart < 0.5) {
      stars.push(<FaStar key={5} className="star" style={{ opacity: 0.5 }} />);
    }

    setValoracionPromedio(stars);
  }, [promedio]);

  const renderContent = () => {
    switch (activeTab) {
      case "descripcion":
        return (
          <div className="info-section">
            <div className="container-info-curso-detail">
              {infoCurso.map((info, index) => (
                <div key={index} className="info-detalle-curso">
                  <h6>{info.subtitulo}</h6>
                  <p>{info.lista}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "reseñas":
        return (
          <div className="info-section">
            <h6>Reseñas de los estudiantes</h6>
            <div className="container-rating-info">
              <div className="valoracion-general">
                <div className="promedio-numero">{promedio}</div>
                <div>{valoracionPromedio}</div>
                <p>Valoracion general</p>
              </div>
              <div className="rating-container">
                {valoracionesGenerales.map((valoracion, index) => (
                  <div key={index} className="star-rating">
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{ width: `${valoracion.porcentaje}%` }}
                      ></div>
                    </div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className="star"
                        style={{
                          color:
                            index < valoracion.estrellas ? "gold" : "#e0e0e0",
                        }}
                      >
                        <FaStar />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="container-estudiantes-calificaciones">
              <h6>Usuarios</h6>
              {reseñas.map((resena, index) => (
                <div key={index} className="reseña-container">
                  <div className="user-info-reseña">
                    <img
                      src={resena.imagen}
                      alt="User"
                      className="user-reseña-img"
                    />
                    <div>
                      <span className="user-reseña-nombre">
                        {resena.nombre}
                      </span>
                      <div className="valoracion-info">
                        <span className="estrellas-reseña">
                          {generarEstrellas(resena.valoracion)}
                        </span>
                        <span className="tiempo-reseña">{resena.tiempo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="info-reseña-comentario">{resena.info}</div>
                  <div className="interacciones-reseña">
                    <button className="like-button">
                      <AiOutlineLike />
                    </button>
                    <button className="dislike-button">
                      <AiOutlineDislike />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "instructor":
        return (
          <div className="info-section">
            <h6>Instructor</h6>
            <div className="instructor-info">
              <img
                src="https://storagexvilearn.blob.core.windows.net/imagenes/13877441320054662-joven.png"
                alt="Foto de perfil"
                className="instructor-img"
              />
              <div className="instructor-details">
                <h3>Jose Mendoza</h3>
                <p>
                  Soy un apasionado desarrollador de software con más de 10 años
                  de experiencia en la creación de aplicaciones web y móviles.
                  Mi enfoque principal ha sido el desarrollo de aplicaciones con
                  tecnologías de vanguardia como React, Node.js y MongoDB. Me
                  encanta compartir mis conocimientos y experiencias con otros y
                  ayudar a los estudiantes a comprender los conceptos más
                  complejos de una manera simple y práctica. Mi objetivo es
                  asegurarme de que mis cursos no solo enseñen habilidades
                  técnicas, sino también la mentalidad y las mejores prácticas
                  necesarias para tener éxito en el mundo del desarrollo de
                  software moderno. ¡Espero verte en mis cursos y ayudarte a
                  alcanzar tus metas de desarrollo profesional!
                </p>
                <p>
                  <span>País de nacimiento:</span> Colombia
                </p>
                <p>
                  <span>Cursos publicados:</span> 70
                </p>
                <p>
                  <span>Rating:</span> 15
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="detail-info-container">
      <div className="info-navigation">
        <button
          className={activeTab === "descripcion" ? "active-tab" : ""}
          onClick={() => setActiveTab("descripcion")}
        >
          Descripcion de este curso
        </button>
        <button
          className={activeTab === "reseñas" ? "active-tab" : ""}
          onClick={() => setActiveTab("reseñas")}
        >
          Reseñas
        </button>
        <button
          className={activeTab === "instructor" ? "active-tab" : ""}
          onClick={() => setActiveTab("instructor")}
        >
          Informacion del instructor
        </button>
      </div>
      {renderContent()}
    </div>
  );
}

export default DetailInfo;
