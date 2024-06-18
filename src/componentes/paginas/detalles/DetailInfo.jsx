import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import "../../../estilos/detalles/cursodetail.css";

function DetailInfo({ cursos }) {
  const [activeTab, setActiveTab] = useState("descripcion");
  const [cursoInfo, setCursoInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const selectedCourse = cursos.find(
        (curso) => curso.Detalles.Curso.ID_curso === id
      );

      if (selectedCourse) {
        setCursoInfo(selectedCourse);
      }
    }
  }, [cursos, id]);

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
              <div className="info-detalle-curso">
                <h6>Duracion del curso</h6>
                <p>20hr</p>
              </div>
              <div className="info-detalle-curso">
                <h6>Descripcion del curso</h6>
                {cursoInfo &&
                cursoInfo.Detalles &&
                cursoInfo.Detalles.Curso &&
                cursoInfo.Detalles.Curso.Descripcion ? (
                  <p>{cursoInfo.Detalles.Curso.Descripcion}</p>
                ) : (
                  <p>No hay descripción disponible</p>
                )}
              </div>
              <div className="info-detalle-curso">
                <h6>Secciones</h6>
                <p>
                  {cursoInfo &&
                  cursoInfo.Detalles &&
                  cursoInfo.Detalles.Curso &&
                  cursoInfo.Detalles.Curso.Secciones
                    ? Object.keys(cursoInfo.Detalles.Curso.Secciones).length
                    : 0}
                </p>
              </div>
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
                    <img src="" alt="User" className="user-reseña-img" />
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
                src={cursoInfo ? cursoInfo.Detalles.Profesor.ProfeUrl : ""}
                alt="Foto de perfil"
                className="instructor-img"
              />
              <div className="instructor-details">
                <h3>{`${cursoInfo.Detalles.Profesor.Nombre} ${cursoInfo.Detalles.Profesor.Apellido}`}</h3>
                <p>{cursoInfo.Detalles.Profesor.Biografia}</p>
                <p>
                  <span>País de nacimiento:</span> {}{" "}
                  {cursoInfo.Detalles.Profesor.Pais}
                </p>
                <p>
                  <span>Cursos publicados:</span>{" "}
                  {
                    cursos.filter(
                      (curso) =>
                        curso.Detalles.Profesor.ID_profe ===
                        cursoInfo.Detalles.Profesor.ID_profe
                    ).length
                  }
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
