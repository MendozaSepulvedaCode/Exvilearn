import React from "react";
import "../../estilos/footer/footer.css";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <img
            src="https://storagexvilearn.blob.core.windows.net/imagenes/logo-completo.png"
            alt="Logo"
            className="logo-completo-footer"
          />
          <p>
            Somos una plataforma educativa que actúa como un puente digital
            entre instructores y estudiantes, permitiendo una experiencia de
            aprendizaje en línea eficiente y efectiva. Nuestra misión es
            fomentar el acceso a la educación de calidad en todo el mundo,
            eliminando las barreras geográficas y facilitando la interacción y
            colaboración entre educadores y aquellos que buscan aprender.
          </p>
        </div>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Navegación</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Cursos</a>
            </li>
            <li>
              <a href="#">Instructores</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-contact">
        <p>&copy; {new Date().getFullYear()} Exvilearn</p>
        <p>Contáctanos: soportexvilearn@exvilearn.com</p>
      </div>
    </footer>
  );
}

export default Footer;
