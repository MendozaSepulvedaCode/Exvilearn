import React, { useState } from "react";
import "../../../../estilos/panel/panelcursos.css";
import { Steps, Button } from "antd";
import PanelInfo from "./PanelInfo";
import PanelSecciones from "./PanelSecciones";
import MenuLateral from "../MenuLateral";
import RightMenu from "../../../Navbar/RightMenu";
import { AiFillDelete } from "react-icons/ai";

const { Step } = Steps;

function PanelVideos() {
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const [courseSections, setCourseSections] = useState(null);

  const manejoCursoData = (data) => {
    setCourseData(data);
  };

  const manejoCursoSecciones = (secciones) => {
    setCourseSections(secciones);
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
      content: <PanelSecciones manejoCursoSecciones={manejoCursoSecciones} />,
    },
  ];

  const eliminarSeccionCurso = (index) => {
    const nuevasSecciones = [...courseSections];
    const seccionEliminada = nuevasSecciones.splice(index, 1)[0];
    setCourseSections(nuevasSecciones);
  
    // Verificar si la sección eliminada tenía un video y establecerlo en null si es así
    if (seccionEliminada && seccionEliminada.video) {
      setCourseData({ ...courseData, video: null });
    }
  };
  

  return (
    <div className="over-view">
      <MenuLateral />
      <div className="over-with-nav">
        <div className="nav-over">
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

              {courseSections &&
                courseSections.map((seccion, index) => (
                  <div key={index}>
                    <div className="preview-curso-detail">
                      <video
                        width="60"
                        height="40"
                        className="video-preview-detail"
                        controls
                      >
                        <source
                          src={URL.createObjectURL(seccion.video)}
                          type="video/mp4"
                        />
                        Tu navegador no soporta la etiqueta de video.
                      </video>
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
                ))}
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
