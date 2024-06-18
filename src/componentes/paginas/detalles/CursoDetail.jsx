import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import Reproductor from "./Reproductor";
import SeccionesInfo from "./SeccionesInfo";
import DetailInfo from "./DetailInfo";
import { BsShareFill, BsSuitHeart, BsLink45Deg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useLoader } from "../../../ayudas/Loader";
import "../../../estilos/detalles/cursodetail.css";

function CursoDetail({ cursos }) {
  const [cursoInfo, setCursoInfo] = useState(null);
  const { id } = useParams();
  const { showLoader, hideLoader } = useLoader();
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    showLoader();

    if (id) {
      const selectedCourse = cursos.find(
        (curso) => curso.Detalles.Curso.ID_curso === id
      );

      if (selectedCourse) {
        setCursoInfo(selectedCourse);

        const videoForSectionZero = Object.entries(
          selectedCourse.Detalles.Curso.Secciones
        ).find(([seccion, seccionInfo]) => {
          const idSeccionFinal = seccionInfo.ID_Seccion;
          return idSeccionFinal.endsWith("-0");
        });

        const videoLink = videoForSectionZero
          ? videoForSectionZero[1]?.LinkVideo[0]
          : null;

        if (videoLink) {
          setSelectedVideo(videoLink);
        }

        hideLoader();
      }
    }
  }, [cursos, id, showLoader, hideLoader]);

  const handleSectionClick = (selectedSection) => {
    const videoLink =
      cursoInfo?.Detalles?.Curso?.Secciones[selectedSection]?.LinkVideo[0];
    if (videoLink) {
      setSelectedVideo(videoLink);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contianer-video-detail-course">
        <div className="container-video-left">
          <div className="header-video-left">
            <h5>
              {cursoInfo
                ? [cursoInfo.Detalles.Curso.Titulo]
                : "Curso no encontrado"}
            </h5>
            <div className="iconos-header-detail">
              <BsLink45Deg id="link" />
              <BsShareFill />
              <BsSuitHeart />
            </div>
          </div>
          <div className="container-info-curso-detail">
            <Reproductor selectedVideo={selectedVideo} />
            <DetailInfo
              cursos={cursos}
              handleSectionClick={handleSectionClick}
            />
          </div>
          <Footer />
        </div>
        <div className="container-video-right">
          <SeccionesInfo
            cursos={cursos}
            handleSectionClick={handleSectionClick}
          />
        </div>
      </div>
    </>
  );
}

export default CursoDetail;
