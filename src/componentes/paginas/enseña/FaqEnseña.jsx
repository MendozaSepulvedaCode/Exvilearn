import "../../../estilos/inicio/enseña.css";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineLink } from "react-icons/hi";

function FaqEnseña() {
  const faqData = [
    {
      question: "¿Cómo puedo registrarme como instructor?",
      answer:
        "Para registrarte como instructor, visita nuestra página de registro y sigue los pasos indicados. Asegúrate de proporcionar la información requerida y completar el proceso de verificación.",
    },
    {
      question: "¿Cuánto tiempo lleva aprobar un curso?",
      answer:
        "El proceso de aprobación de cursos puede llevar hasta 48 horas. Nuestro equipo revisará el contenido del curso para asegurarse de que cumpla con nuestros estándares de calidad y aprendizaje.",
    },
    {
      question: "¿Cómo puedo crear y subir mis propios cursos?",
      answer:
        "Después de registrarte como instructor, podrás acceder a tu panel de control. Desde allí, encontrarás la opción para crear un nuevo curso. Puedes cargar tus videos, crear contenido y diseñar tu curso según tus conocimientos.",
    },
    {
      question: "¿Cómo funciona el sistema de pagos para instructores?",
      answer:
        "Una vez que tus cursos sean aprobados y comiencen a venderse, recibirás un porcentaje de las ganancias por cada venta. Las ganancias se depositarán en tu cuenta mensualmente, y podrás acceder a un informe detallado de tus ingresos desde tu panel de control.",
    },
  ];

  const [activePanel, setActivePanel] = useState(null);

  const handlePanelClick = (panelIndex) => {
    if (activePanel === panelIndex) {
      setActivePanel(null);
    } else {
      setActivePanel(panelIndex);
    }
  };

  return (
    <div className="faq-container">
      <div className="faq-left">
        <img src="https://blobstorageexvi.blob.core.windows.net/imagenes/faqwebp.webp" alt="faq" />
        <h5 className="faq-text">
          Preguntas <br />
          <span>Frecuentes</span>
        </h5>
        <a className="link-chat" href="/">
          <HiOutlineLink /> ¿Necesitas ayuda? Chatea con nosotros{" "}
        </a>
      </div>
      <div className="faq-content">
        <div className="accordion">
          {faqData.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <div
                className={`accordion-header ${
                  activePanel === index ? "active" : ""
                }`}
                onClick={() => handlePanelClick(index)}
              >
                {faq.question}
                <FaChevronDown
                  className={`accordion-icon ${
                    activePanel === index ? "rotate" : ""
                  }`}
                />
              </div>
              <div
                className={`accordion-content ${
                  activePanel === index ? "show" : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqEnseña;
