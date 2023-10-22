import React, { useState } from "react";
import "../../../estilos/inicio/categorias.css";
import {
  FaCode,
  FaLanguage,
  FaDumbbell,
  FaMoneyBillAlt,
  FaChartLine,
  FaSmile,
} from "react-icons/fa";

const Categorias = () => {
  const categorias = [
    { nombre: "Programación", icono: <FaCode />, cursos: 25 },
    { nombre: "Idiomas", icono: <FaLanguage />, cursos: 18 },
    { nombre: "Deporte", icono: <FaDumbbell />, cursos: 12 },
    { nombre: "Trading", icono: <FaChartLine />, cursos: 15 },
    { nombre: "Finanzas", icono: <FaMoneyBillAlt />, cursos: 20 },
    { nombre: "Estilo de Vida", icono: <FaSmile />, cursos: 8 },
  ];

  const [pagina, setPagina] = useState(0);

  const retrocederPagina = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const avanzarPagina = () => {
    if (pagina < Math.ceil(categorias.length / 4) - 1) {
      setPagina(pagina + 1);
    }
  };

  const desplazamiento = -pagina * 80;

  return (
    <div className="categorias">
      <div className="categorias-header">
        <div className="header-pag">
          <h5>Seleccionar categoría</h5>
          <div className="categorias-description">
            <p>Conoce todas las categorias que tenemos para brindarte!</p>
          </div>
        </div>
        <div className="pagination">
          <button className="button-pag" onClick={retrocederPagina}>
            &lt;
          </button>
          <button className="button-pag" onClick={avanzarPagina}>
            {" "}
            &gt;
          </button>
        </div>
      </div>
      <div
        className="categoria-container"
        style={{ transform: `translateX(${desplazamiento}%)` }}
      >
        {categorias.map((categoria, index) => (
          <div
            className="categoria"
            key={index}
            style={{ backgroundColor: categoria.color }}
          >
            <div className="tag-categoria">
              {" "}
              <span className="cantidad-cursos">{categoria.cursos} cursos</span>
            </div>
            {categoria.icono}
            <div className="descripcion-categoria">
              <span className="nombre">{categoria.nombre}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
