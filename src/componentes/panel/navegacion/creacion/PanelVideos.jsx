import React, { useState } from "react";
import "../../../../estilos/panel/panelcursos.css";
import { Steps, Button } from "antd";
import PanelInfo from "./PanelInfo";
import PanelSecciones from "./PanelSecciones";
import MenuLateral from "../MenuLateral";
import RightMenu from "../../../Navbar/RightMenu";
import { AiFillDelete, AiOutlineInbox } from "react-icons/ai";
import { FileOutlined, AudioOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../../Footer/Footer";

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
    const seccionesConDuracion = secciones.map((seccion) => ({
      ...seccion,
      duracionVideo: "",
    }));
    setCourseSections([...courseSections, ...seccionesConDuracion]);
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

  const metaDataManejo = (e, seccion, index) => {
    const nuevasSecciones = [...courseSections];
    let duracion;

    const extension = seccion.video.name.split(".").pop();
    const isAudio =
      extension === "mp3" ||
      extension === "wav" ||
      extension === "ogg" ||
      extension === "m4a";

    if (isAudio) {
      duracion = "audio";
    } else {
      const duracionEnMinutos = Math.floor(e.target.duration / 60);
      duracion = `${duracionEnMinutos} min`;
    }
    nuevasSecciones[index].duracionVideo = duracion;
    setCourseSections(nuevasSecciones);
  };

  const finalizarCreacion = async () => {
    if (!courseData || !courseSections || courseSections.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay secciones",
        text: "Por favor, cree las secciones del curso",
        confirmButtonColor: "#107acc",
      });
      return;
    }

    const getRandomString = (length) => {
      const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const charactersLength = characters.length;
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const infoCurso = {
      ID_profe: "1829",
      titulo: courseData.titulo,
      precio: parseInt(courseData.precio.replace(/\D/g, ""), 10),
      categoria: courseData.categoria,
      descripcion: courseData.descripcion,
      palabrasClave: courseData.palabrasClave,
      // miniatura: courseData.miniatura,
      secciones: [],
    };

    const seccionesFormData = new FormData();

    courseSections.forEach((seccion, index) => {
      const randomStr = getRandomString(8);
      const categoryInitial = courseData.categoria.charAt(0).toUpperCase();
      const ID_Seccion = `${categoryInitial}-${randomStr}`;
      const seccionObj = {
        ID_Seccion,
        video: seccion.video ? seccion.video.name : null,
        documentos: seccion.documento.map((doc) => doc.name),
      };
      infoCurso.secciones.push(seccionObj);
      if (seccion.video) {
        seccionesFormData.append(
          `secciones[${ID_Seccion}][video]`,
          seccion.video
        );
      }

      seccion.documento.forEach((documento, docIndex) => {
        seccionesFormData.append(
          `secciones[${ID_Seccion}][documentos][${docIndex}]`,
          documento
        );
      });
    });

    const infoCursoURL = `${import.meta.env.VITE_API_BLOBS}newcourse`;
    const seccionObjURL = `${import.meta.env.VITE_API_BLOBS}upload`;

    try {
      const responseInfoCurso = await fetch(infoCursoURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoCurso),
      });

      if (responseInfoCurso.ok) {
        console.log("InfoCurso enviado con éxito");
      } else {
        console.error("Error al enviar infoCurso");
      }

      const promises = infoCurso.secciones.map((seccion) => {
        return fetch(seccionObjURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(seccion),
        }).then((responseSeccionObj) => {
          if (responseSeccionObj.ok) {
            console.log(`SeccionObj ${seccion.ID_Seccion} enviado con éxito`);
          } else {
            console.error(`Error al enviar SeccionObj ${seccion.ID_Seccion}`);
          }
        });
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Secciones FormData:");
    for (const [key, value] of seccionesFormData.entries()) {
      console.log(key, value);
    }

    console.log("Info Curso:", JSON.stringify(infoCurso, null, 2));
  };

  return (
    <div className="panel-videos-final">
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
                <h5>Contenido del curso</h5>
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
                        {seccion.video.type.includes("audio") ? (
                          <div className="audio-preview-detail">
                            <AudioOutlined />
                          </div>
                        ) : (
                          <video
                            width="60"
                            height="40"
                            className="video-preview-detail"
                            controls={false}
                            onLoadedMetadata={(e) =>
                              metaDataManejo(e, seccion, index)
                            }
                          >
                            <source
                              src={URL.createObjectURL(seccion.video)}
                              type="video/mp4"
                            />
                            Tu navegador no soporta la etiqueta de video.
                          </video>
                        )}
                        <div className="info-curso-preview">
                          <p className="titulo-seccion-class">
                            {seccion.titulo}
                          </p>
                          <p className="duracion-video-class">
                            {seccion.duracionVideo}
                          </p>
                        </div>
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
                    <Button
                      onClick={finalizarCreacion}
                      className="btn-finalizar"
                    >
                      Finalizar Creación
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PanelVideos;
