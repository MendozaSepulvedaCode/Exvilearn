import React, { useState } from "react";
import Swal from "sweetalert2";
import { Input, Button, Select } from "antd";
import {
  DownOutlined,
  DeleteOutlined,
  FontColorsOutlined,
  DollarCircleOutlined,
  KeyOutlined,
} from "@ant-design/icons";

function PanelInfo({ setCurrentStep, manejoCursoData }) {
  const [infoCurso, setInfoCurso] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: "",
    miniatura: null,
  });

  const [palabrasClave, setPalabrasClave] = useState([]);
  const [nuevaPalabra, setNuevaPalabra] = useState("");
  const [coloresFondo, setColoresFondo] = useState([]);
  const [palabraContador, setPalabraContador] = useState(0);

  const agregarComas = (value) => {
    const parts = value.replace(/[^\d]/g, "").split(".");
    const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.length > 1 ? `${wholePart}.${parts[1]}` : wholePart;
  };

  const manejarDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setInfoCurso({
          ...infoCurso,
          miniatura: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor, selecciona un archivo de imagen en formato JPEG, JPG o PNG.",
        confirmButtonColor: "#107acc",
      });
    }
  };

  const elegirImagen = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png")
      ) {
        const reader = new FileReader();
        reader.onload = function (event) {
          setInfoCurso({
            ...infoCurso,
            miniatura: event.target.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire({
          icon: "error",
          title: "Archivo no válido",
          text: "Por favor, selecciona un archivo de imagen en formato JPEG, JPG o PNG.",
          confirmButtonColor: "#107acc",
        });
      }
    };
    input.click();
  };

  const manejarArrastre = (e) => {
    e.preventDefault();
  };

  const manejarCambioEntrada = (name, value) => {
    const palabras = value.trim().split(/\s+/);
    setPalabraContador(palabras.length);

    if (name === "titulo" && palabras.length > 15) {
      return;
    }

    setInfoCurso({
      ...infoCurso,
      [name]: value,
    });
  };

  const manejarCambioPrecio = (value) => {
    value = agregarComas(value);

    setInfoCurso({
      ...infoCurso,
      precio: value,
    });
  };

  const manejarCambioDescripcion = (value) => {
    setInfoCurso({
      ...infoCurso,
      descripcion: value,
    });
  };

  const manejarCambioCategoria = (value) => {
    setInfoCurso({
      ...infoCurso,
      categoria: value,
    });
  };

  const agregarPalabraClave = () => {
    if (nuevaPalabra && palabrasClave.length < 8) {
      // Limitar a un máximo de 8 palabras
      setPalabrasClave([...palabrasClave, nuevaPalabra]);
      setColoresFondo([...coloresFondo, getRandomColor()]);
      setNuevaPalabra("");
    }
  };

  const eliminarPalabraClave = (index) => {
    const palabrasActualizadas = palabrasClave.filter((_, i) => i !== index);
    setPalabrasClave(palabrasActualizadas);
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const enviarFormulario = () => {
    if (
      !infoCurso.titulo ||
      !infoCurso.descripcion ||
      !infoCurso.categoria ||
      !infoCurso.precio ||
      !infoCurso.categoria ||
      !infoCurso.miniatura
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
        confirmButtonColor: "#107acc",
      });
      return;
    }

    const data = {
      titulo: infoCurso.titulo,
      descripcion: infoCurso.descripcion,
      categoria: infoCurso.categoria,
      precio: infoCurso.precio,
    };

    manejoCursoData(data);

    setCurrentStep(1);
    Swal.fire({
      icon: "success",
      title: "Informacion basica lista",
      text: "Primer paso listo",
      confirmButtonColor: "#107acc"
    });

    setInfoCurso({
      titulo: "",
      descripcion: "",
      categoria: "",
      precio: "",
      miniatura: "",
    });
  };

  return (
    <div className="panel-info-container">
      <div className="form-container">
        <h5 className="titulo-crear-info">Crear un Nuevo Curso</h5>
        <div className="input-container">
          <Input
            placeholder="Título del curso"
            name="titulo"
            value={infoCurso.titulo}
            onChange={(e) => manejarCambioEntrada("titulo", e.target.value)}
            addonBefore={<FontColorsOutlined />}
          />
          <p className="word-count">{palabraContador} / 15 palabras</p>
        </div>
        <div className="input-container">
          <Input
            placeholder="Precio del curso"
            name="precio"
            value={infoCurso.precio}
            onChange={(e) => manejarCambioPrecio(e.target.value)}
            addonBefore={<DollarCircleOutlined />}
          />
        </div>
        <div className="input-container">
          <Input.TextArea
            placeholder="Descripción del curso"
            name="descripcion"
            value={infoCurso.descripcion}
            onChange={(e) => manejarCambioDescripcion(e.target.value)}
            rows={6}
          />
        </div>

        <Select
          value={infoCurso.categoria}
          className="categoria-input"
          onChange={(value) => manejarCambioCategoria(value)}
          style={{ marginBottom: "15px" }}
          suffixIcon={<DownOutlined />}
        >
          <Select.Option value="" disabled>
            Categoría del curso
          </Select.Option>
          <Select.Option value="Programacion">Programacion</Select.Option>
          <Select.Option value="Trading">Trading</Select.Option>
          <Select.Option value="Idiomas">Idiomas</Select.Option>
          <Select.Option value="Estilo">Estilo de vida</Select.Option>
          <Select.Option value="Deportes">Deportes</Select.Option>
          <Select.Option value="Finanzas">Finanzas</Select.Option>
        </Select>

        <div
          className="dropzone-imagen"
          onDrop={manejarDrop}
          onDragOver={manejarArrastre}
          onClick={elegirImagen}
          style={{
            height: infoCurso.miniatura ? "12vh" : "auto",
            width: infoCurso.miniatura ? "20%" : "auto",
          }}
        >
          {infoCurso.miniatura ? (
            <img
              src={infoCurso.miniatura}
              alt="miniatura arrastrada"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <p>Arrastra y suelta o elige la miniatura aquí</p>
          )}
        </div>

        <div className="palabras-clave">
          <Input
            placeholder="Palabra clave (Maximo 2 por campo y 8 en total)"
            name="palabra"
            value={nuevaPalabra}
            onChange={(e) => {
              const inputText = e.target.value;
              const words = inputText.trim().split(/\s+/);
              if (words.length <= 2) {
                setNuevaPalabra(inputText);
              }
            }}
            addonBefore={<KeyOutlined />}
          />
          <Button className="boton-palabra" onClick={agregarPalabraClave}>
            Agregar
          </Button>
        </div>
        <div className="contenedor-palabras">
          {palabrasClave.slice(0, 8).map((palabra, index) => (
            <div
              key={index}
              className="palabra"
              style={{ backgroundColor: coloresFondo[index] }}
            >
              <span>{palabra}</span>
              <button
                className="eliminar-palabra"
                onClick={() => eliminarPalabraClave(index)}
              >
                <DeleteOutlined />
              </button>
            </div>
          ))}
        </div>

        <Button className="boton-info" onClick={enviarFormulario}>
          Continuar
        </Button>
      </div>
    </div>
  );
}

export default PanelInfo;
