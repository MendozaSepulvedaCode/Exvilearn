import React from "react";
import "../../../estilos/inicio/enseña.css";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { autenticar } from "../../../ayudas/autenticar";
import Swal from "sweetalert2";

function HeaderEnseña() {
  const navigate = useNavigate();

  const manejoUsuarios = () => {
    const { valid } = autenticar();

    navigate("/StepByStep");

    if (valid) {
      navigate("/StepByStep");
    } else {
      Swal.fire({
        icon: "error",
        title: "Inicio de sesión requerido",
        text: "Debe iniciar sesión para ser un instructor.",
        confirmButtonColor: "#107acc",
      });
    }
  };
  return (
    <div className="enseña-container">
      <div className="landing-container">
        <div className="left-section">
          <h3 className="heading">
            Eleva tu Carrera: ¡Sé un <span>Maestro</span> en Línea!
          </h3>
          <p className="paragraph">
            Impulsa tu carrera como instructor en línea y forma parte de un
            equipo diverso y apasionado. Unete a Exvilearn y empieza a impartir
            conocimiento.
          </p>
          <div className="features">
            <div className="feature">
              <h5>120+</h5>
              <p>Cursos</p>
            </div>
            <div className="feature">
              <h5>15k+</h5>
              <p>Estudiantes</p>
            </div>
            <div className="feature">
              <h5>8+</h5>
              <p>Categorias</p>
            </div>
          </div>
          <button className="unirse-profesor" onClick={manejoUsuarios}>
            Empezar <MdNavigateNext className="icono-unirse" />
          </button>
        </div>

        <div className="right-section">
          <img
            src="https://blobstorageexv.blob.core.windows.net/imagenes/viejo3d.webp"
            alt="Profesor"
            className="visual"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderEnseña;
