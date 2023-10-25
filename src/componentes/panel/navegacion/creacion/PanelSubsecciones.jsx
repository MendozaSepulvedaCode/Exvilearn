import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Input, Button } from "antd";
import "../../../../estilos/panel/panelcursos.css";
import {
  FontColorsOutlined,
  FileOutlined,
  DeleteOutlined,
} from "@ant-design/icons";


function PanelSubsecciones({
  manejoCursoSecciones,
  courseSections,
  setCurrentStep,
}) {
  const [infoSubSeccion, setinfoSubSeccion] = useState({
    subTitulo: "",
    subVideo: null,
    subDocumento: [],
  });

  const [palabraContador, setPalabraContador] = useState(0);

  const [subDocumentosPorSeccion, setsubDocumentosPorSeccion] = useState([]);

  const manejarCamvbiosubTitulo = (name, value) => {
    const palabras = value.trim().split(/\s+/);
    setPalabraContador(palabras.length);

    if (name === "subTitulo" && palabras.length > 10) {
      return;
    }

    setinfoSubSeccion({
      ...infoSubSeccion,
      subTitulo: value,
    });
  };

  const manejarDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes("video")) {
      setinfoSubSeccion({
        ...infoSubSeccion,
        subVideo: file,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor, selecciona un archivo de subVideo.",
      });
    }
  };

  const manejarArrastre = (e) => {
    e.preventDefault();
  };

  const elegirsubVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setinfoSubSeccion({
          ...infoSubSeccion,
          subVideo: file,
        });
      }
    };
    input.click();
  };

  const eliminarsubVideo = () => {
    setinfoSubSeccion({
      ...infoSubSeccion,
      subVideo: null,
    });
  };

  const agregarsubDocumento = (e) => {
    const limitesubDocumentosPorSeccion = 3;
    const subDocumentosEnEstaSeccion = infoSubSeccion.subDocumento.length || [];
    if (subDocumentosEnEstaSeccion < limitesubDocumentosPorSeccion) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".pdf";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
          const nuevossubDocumentos = [...infoSubSeccion.subDocumento, file];
          setinfoSubSeccion({
            ...infoSubSeccion,
            subDocumento: nuevossubDocumentos,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Archivo no válido",
            text: "Por favor, selecciona un archivo PDF.",
          });
        }
      };
      input.click();
    } else {
      Swal.fire({
        icon: "error",
        title: "Límite de documentos alcanzado",
        text: "Ya ha alcanzado el límite de 3 documentos para esta sección.",
      });
    }
  };

  const validarCampos = () => {
    if (!infoSubSeccion.subTitulo || !infoSubSeccion.subVideo) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa los campos de título y video.",
      });
      return false;
    }
    return true;
  };

  const crearOtraSeccion = () => {
    if (!validarCampos()) {
      return;
    }

    if (infoSubSeccion.subTitulo) {
      manejoCursoSecciones([infoSubSeccion]);

      setinfoSubSeccion({
        subTitulo: "",
        subVideo: null,
        subDocumento: [],
      });

      setDocumentosPorSeccion([
        ...subDocumentosPorSeccion,
        infoSubSeccion.subDocumento || [],
      ]);

      Swal.fire({
        icon: "success",
        title: "Sección creada",
        text: "La sección se ha creado correctamente.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, ingresa al menos el título de la sección.",
      });
    }
  };

  const devolverStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // const finalizarCreacion = () => {
  //   if (!validarCampos()) {
  //     return;
  //   }

  //   const nuevaSeccion = {
  //     subTitulo: infoSubSeccion.subTitulo,
  //     video: infoSubSeccion.video ? infoSubSeccion.video.name : null,
  //     subDocumento: infoSubSeccion.subDocumento ? infoSubSeccion.subDocumento.name : null,
  //   };

  //   // Agregar la nueva sección al array de secciones
  //   setSecciones([...secciones, nuevaSeccion]);
  //   console.log("Secciones actuales:", JSON.stringify(secciones, null, 2));

  //   // Limpiar la información actual
  //   setinfoSubSeccion({
  //     subTitulo: "",
  //     video: null,
  //     subDocumento: null,
  //     subsecciones: [],
  //   });

  //   // Mostrar alerta de éxito
  //   Swal.fire({
  //     icon: "success",
  //     title: "Curso creado",
  //     text: "El curso se ha creado exitosamente.",
  //   });
  // };

  const eliminarsubDocumento = (index) => {
    const nuevossubDocumentos = [...infoSubSeccion.subDocumento];
    nuevossubDocumentos.splice(index, 1);
    setinfoSubSeccion({ ...infoSubSeccion, subDocumento: nuevossubDocumentos });
  };
  const manejarCambiosubDocumento = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (!infoSubSeccion.subDocumento) {
        setinfoSubSeccion({
          ...infoSubSeccion,
          subDocumento: [file],
        });
      } else if (infoSubSeccion.subDocumento.length < 3) {
        const nuevossubDocumentos = [...infoSubSeccion.subDocumento, file];
        setinfoSubSeccion({
          ...infoSubSeccion,
          subDocumento: nuevossubDocumentos,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Límite de documentos alcanzado",
          text: "Ya ha alcanzado el límite de 3 documentos.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor, selecciona un archivo PDF.",
      });
    }
  };

  //Subsecciones

  const crearOtraSubseccion = () => {
    if (!validarCampos()) {
      return;
    }

    if (infoSubSeccion.subTitulo) {
      const updatedCourseSections = [...courseSections];
      updatedCourseSections.push(infoSubSeccion);

      manejoCursoSecciones(updatedCourseSections);

      setinfoSubSeccion({
        subTitulo: "",
        subVideo: null,
        subDocumento: [],
      });

      Swal.fire({
        icon: "success",
        title: "Subsección agregada",
        text: "La subsección se ha agregado correctamente.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, ingresa al menos el título de la subsección.",
      });
    }
  };

  return (
    <div className="panel-secciones-container">
      <div className="seccion-form">
        <div className="input-container">
          <Input
            placeholder={`Título de la Subsección`}
            value={infoSubSeccion.subTitulo}
            onChange={(e) =>
              manejarCamvbiosubTitulo("subTitulo", e.target.value)
            }
            addonBefore={<FontColorsOutlined />}
          />
          <p className="word-count">{palabraContador} / 10 palabras</p>
        </div>
        <div
          className="video-dropzone"
          onDrop={manejarDrop}
          onDragOver={manejarArrastre}
        >
          {infoSubSeccion.subVideo ? (
            <div className="video-preview-container">
              <video className="video-preview" controls>
                <source src={URL.createObjectURL(infoSubSeccion.subVideo)} />
              </video>
              <button
                className="delete-video-button btn btn-danger"
                onClick={eliminarsubVideo}
              >
                Eliminar Video
              </button>
            </div>
          ) : (
            <span onClick={elegirsubVideo}>
              Haz clic aquí o arrastra un video aquí
            </span>
          )}
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setinfoSubSeccion({
                  ...infoSubSeccion,
                  subVideo: file,
                });
              }
            }}
          />
        </div>

        <div className="document-container">
          {infoSubSeccion.subDocumento && infoSubSeccion.subDocumento.length > 0
            ? infoSubSeccion.subDocumento.map((subDocumento, index) => (
                <div className="document-info" key={index}>
                  <FileOutlined />
                  <span>{subDocumento.name}</span>
                  <button
                    className="delete-video-button-documento btn btn-danger"
                    onClick={() => eliminarsubDocumento(index)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))
            : null}
          {infoSubSeccion.subDocumento &&
            infoSubSeccion.subDocumento.length < 3 && (
              <Button icon={<FileOutlined />} onClick={agregarsubDocumento}>
                Añadir Documento
              </Button>
            )}
          <input
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={manejarCambiosubDocumento}
          />
        </div>

        <div className="buttons-container">
          <Button
            className="section-button"
            type="primary"
            onClick={crearOtraSeccion}
          >
            Crear otra sección
          </Button>
          <Button className="subsection-button" type="primary">
            Agregar otra subsección
          </Button>
          <Button
            className="subsection-button"
            type="primary"
            onClick={devolverStep}
          >
            Ir a informacion basica
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PanelSubsecciones;
