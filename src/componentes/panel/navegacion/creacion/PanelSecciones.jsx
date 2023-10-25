import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Input, Button } from "antd";
import "../../../../estilos/panel/panelcursos.css";
import {
  FontColorsOutlined,
  FileOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function PanelSecciones({
  manejoCursoSecciones,
  courseSections,
  setCurrentStep,
}) {
  const [infoSeccion, setInfoSeccion] = useState({
    titulo: "",
    video: null,
    documento: [],
    subsecciones: [],
  });

  const [palabraContador, setPalabraContador] = useState(0);

  const [documentosPorSeccion, setDocumentosPorSeccion] = useState([]);

  const manejarCamvbioTitulo = (name, value) => {
    const palabras = value.trim().split(/\s+/);
    setPalabraContador(palabras.length);

    if (name === "titulo" && palabras.length > 10) {
      return;
    }

    setInfoSeccion({
      ...infoSeccion,
      titulo: value,
    });
  };

  const manejarDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes("video")) {
      setInfoSeccion({
        ...infoSeccion,
        video: file,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor, selecciona un archivo de video.",
      });
    }
  };

  const manejarArrastre = (e) => {
    e.preventDefault();
  };

  const elegirVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setInfoSeccion({
          ...infoSeccion,
          video: file,
        });
      }
    };
    input.click();
  };

  const eliminarVideo = () => {
    setInfoSeccion({
      ...infoSeccion,
      video: null,
    });
  };

  const agregarDocumento = (e) => {
    const limiteDocumentosPorSeccion = 3;
    const documentosEnEstaSeccion = infoSeccion.documento.length || [];
    if (documentosEnEstaSeccion < limiteDocumentosPorSeccion) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".pdf";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
          const nuevosDocumentos = [...infoSeccion.documento, file];
          setInfoSeccion({
            ...infoSeccion,
            documento: nuevosDocumentos,
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
    if (!infoSeccion.titulo || !infoSeccion.video) {
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

    if (infoSeccion.titulo) {
      manejoCursoSecciones([infoSeccion]);

      // Reinicia los valores de los campos
      setInfoSeccion({
        titulo: "",
        video: null,
        documento: [],
      });

      // Actualiza documentos por sección
      setDocumentosPorSeccion([
        ...documentosPorSeccion,
        infoSeccion.documento || [],
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
  //     titulo: infoSeccion.titulo,
  //     video: infoSeccion.video ? infoSeccion.video.name : null,
  //     documento: infoSeccion.documento ? infoSeccion.documento.name : null,
  //   };

  //   // Agregar la nueva sección al array de secciones
  //   setSecciones([...secciones, nuevaSeccion]);
  //   console.log("Secciones actuales:", JSON.stringify(secciones, null, 2));

  //   // Limpiar la información actual
  //   setInfoSeccion({
  //     titulo: "",
  //     video: null,
  //     documento: null,
  //     subsecciones: [],
  //   });

  //   // Mostrar alerta de éxito
  //   Swal.fire({
  //     icon: "success",
  //     title: "Curso creado",
  //     text: "El curso se ha creado exitosamente.",
  //   });
  // };

  const eliminarDocumento = (index) => {
    const nuevosDocumentos = [...infoSeccion.documento];
    nuevosDocumentos.splice(index, 1);
    setInfoSeccion({ ...infoSeccion, documento: nuevosDocumentos });
  };
  const manejarCambioDocumento = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (!infoSeccion.documento) {
        setInfoSeccion({
          ...infoSeccion,
          documento: [file],
        });
      } else if (infoSeccion.documento.length < 3) {
        const nuevosDocumentos = [...infoSeccion.documento, file];
        setInfoSeccion({
          ...infoSeccion,
          documento: nuevosDocumentos,
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

  return (
    <div className="panel-secciones-container">
      <div className="seccion-form">
        <div className="input-container">
          <Input
            placeholder={`Título de la sección`}
            value={infoSeccion.titulo}
            onChange={(e) => manejarCamvbioTitulo("titulo", e.target.value)}
            addonBefore={<FontColorsOutlined />}
          />
          <p className="word-count">{palabraContador} / 10 palabras</p>
        </div>
        <div
          className="video-dropzone"
          onDrop={manejarDrop}
          onDragOver={manejarArrastre}
        >
          {infoSeccion.video ? (
            <div className="video-preview-container">
              <video className="video-preview" controls>
                <source src={URL.createObjectURL(infoSeccion.video)} />
              </video>
              <button
                className="delete-video-button btn btn-danger"
                onClick={eliminarVideo}
              >
                Eliminar Video
              </button>
            </div>
          ) : (
            <span onClick={elegirVideo}>
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
                setInfoSeccion({
                  ...infoSeccion,
                  video: file,
                });
              }
            }}
          />
        </div>

        <div className="document-container">
          {infoSeccion.documento && infoSeccion.documento.length > 0
            ? infoSeccion.documento.map((documento, index) => (
                <div className="document-info" key={index}>
                  <FileOutlined />
                  <span>{documento.name}</span>
                  <button
                    className="delete-video-button-documento btn btn-danger"
                    onClick={() => eliminarDocumento(index)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))
            : null}
          {infoSeccion.documento && infoSeccion.documento.length < 3 && (
            <Button icon={<FileOutlined />} onClick={agregarDocumento}>
              Añadir Documento
            </Button>
          )}
          <input
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={manejarCambioDocumento}
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
            Agregar subsección
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

export default PanelSecciones;
