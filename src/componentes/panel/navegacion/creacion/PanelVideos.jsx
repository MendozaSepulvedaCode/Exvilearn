import React, { useState } from "react";
import "../../../../estilos/panel/panelcursos.css";
import { Steps, Button } from "antd";
import PanelInfo from "./PanelInfo";
import PanelSecciones from "./PanelSecciones";
import MenuLateral from "../MenuLateral";
import RightMenu from "../../../Navbar/RightMenu";
import { AiFillDelete, AiOutlineInbox } from "react-icons/ai";

const { Step } = Steps;

function PanelVideos() {
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [courseSections, setCourseSections] = useState([]);
  const [deletedSections, setDeletedSections] = useState(0);
  const [duracionVideo, setDuracionVideo] = useState("");

  const manejoCursoData = (data) => {
    setCourseData(data);
  };

  const manejoCursoSecciones = (secciones) => {
    setCourseSections([...courseSections, ...secciones]);
    setDeletedSections(0);
  };

  const steps = [
    {
      title: "Información básica",
      content: (
        <PanelInfo
          setCurrentStep={setCurrentStep}
          manejoCursoData={manejoCursoData}
        />
      ),
    },
    {
      title: "Secciones",
      content: (
        <PanelSecciones
          manejoCursoSecciones={manejoCursoSecciones}
          courseSections={courseSections}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
  ];

  const eliminarSeccionCurso = (index) => {
    const seccionEliminada = courseSections[index];
    const nuevasSecciones = courseSections.filter((_, i) => i !== index);

    setCourseSections(nuevasSecciones);

    if (seccionEliminada && seccionEliminada.video) {
      setCourseData((prevData) => ({ ...prevData, video: null }));
    }

    setDeletedSections((prevDeleted) => prevDeleted + 1);
  };

  const iniciarArrastre = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const permitirSoltar = (e) => {
    e.preventDefault();
  };

  const finalizarSoltar = (e, index) => {
    e.preventDefault();
    const indiceOrigen = e.dataTransfer.getData("text/plain");
    const nuevasSecciones = Array.from(courseSections);
    const [elementoArrastrado] = nuevasSecciones.splice(indiceOrigen, 1);
    nuevasSecciones.splice(index, 0, elementoArrastrado);
    setCourseSections(nuevasSecciones);
  };

  return (
    <div className="over-view">
      <MenuLateral />
      <div className="over-with-nav">
        <div className="nav-over">
          <h5>Panel - Creacion de curso</h5>
          <RightMenu />
        </div>
        <div className="over-container">
          <div className="curso-steps-container">
            <div className="steps-header">
              <Steps current={currentStep} items={steps} />
            </div>
            <div className="steps-view">{steps[currentStep].content}</div>
          </div>
          <div className="preview-cursos">
            <div className="container-info-curso">
              <h5>Recuento</h5>
              {courseData && (
                <div className="preview-header-info">
                  <h6>{courseData.titulo}</h6>
                  <p> {courseData.categoria}</p>
                </div>
              )}

              {courseSections && courseSections.length > 0 ? (
                courseSections.map((seccion, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => iniciarArrastre(e, index)}
                    onDragOver={(e) => permitirSoltar(e)}
                    onDrop={(e) => finalizarSoltar(e, index)}
                    className="seccion-arrastrable"
                  >
                    <div className="preview-curso-detail">
                      <video
                        width="60"
                        height="40"
                        className="video-preview-detail"
                        controls
                        onLoadedMetadata={(e) => {
                          setDuracionVideo(`${e.target.duration} segundos`);
                        }}
                      >
                        <source
                          src={URL.createObjectURL(seccion.video)}
                          type="video/mp4"
                        />
                        Tu navegador no soporta la etiqueta de video.
                      </video>
                      <p>{duracionVideo}</p> 
                      <p>{seccion.titulo}</p>
                      <button
                        className="boton-eliminar-seccion"
                        onClick={() => eliminarSeccionCurso(index)}
                      >
                        {" "}
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="vacio-preview">
                  <AiOutlineInbox />
                  <p>No hay vista previa aún</p>
                </div>
              )}
              <div className="botones-container">
                {currentStep === steps.length - 1 && (
                  <Button onClick={() => console.log("Finalizar creación")}>
                    Finalizar Creación
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelVideos;
