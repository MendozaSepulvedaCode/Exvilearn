import React from "react";
import "../../../estilos/inicio/enseña.css";

function ContactEnseña() {
  return (
    <div className="contact-container">
      <div className="left-section-end">
        <img
          src="https://blobstorageexv.blob.core.windows.net/imagenes/3dprofesor.webp"
          alt="Estudiantes"
          className="image-contact"
        />
      </div>
      <div className="right-section-end">
        <div className="subscribe-message">
          <h5>
            Suscríbete para obtener las últimas noticias de nuestra plataforma
          </h5>
        </div>
        <form className="subscription-form">
          <div className="input-with-button">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="email-input"
            />
            <button type="submit" className="subscribe-button">
              Suscribirse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactEnseña;
