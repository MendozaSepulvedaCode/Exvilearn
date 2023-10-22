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

function PanelInfo({ setCurrentStep }) {
  const [infoCurso, setInfoCurso] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: "",
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
      !infoCurso.precio
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de continuar.",
      });
      return;
    }

    // Aquí puedes realizar alguna acción con los datos validados
    // por ejemplo, enviarlos al servidor o pasar a la siguiente etapa del flujo.
    setCurrentStep(1);
    Swal.fire({
      icon: "success",
      title: "Informacion basica lista",
      text: "Primer paso listo",
    });

    // Limpia los campos después de enviar los datos o completar la acción
    setInfoCurso({
      titulo: "",
      descripcion: "",
      categoria: "",
      precio: "",
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
          <Select.Option value="categoria1">Programacion</Select.Option>
          <Select.Option value="categoria2">Trading</Select.Option>
          <Select.Option value="categoria3">Idiomas</Select.Option>
        </Select>
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
