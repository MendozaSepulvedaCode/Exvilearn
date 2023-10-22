import React, { useState } from "react";
import { Card, Steps, Checkbox } from "antd";
import { CheckCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "../../../estilos/steps/steps.css";
import Footer from "../../Footer/Footer";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import StepTwo from "./StepTwo";
import Navbar from "../../Navbar/Navbar";

const { Step } = Steps;

function StepByStep() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompany, setIsCompany] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [completedData, setCompletedData] = useState([]);

  const handleFinish = () => {
    const data = {
      phoneNumber,
      isCompany,
      companyName,
      selectedCategories,
    };
    setCompletedData([data]);
    navigate("/PanelCursos");
  };

  const steps = [
    {
      title: "Empezar",
      content: (
        <div className="step-content">
          <h3>¡Bienvenido al Registro de instructores!</h3>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
          <div className="card-group">
            <Card
              className={`step-card ${isCompany === false ? "selected" : ""}`}
              onClick={() => setIsCompany(false)}
            >
              <div className="header-card">
                <h3 className="card-title">Independiente</h3>
                {isCompany === false && (
                  <CheckCircleOutlined className="check-icon" />
                )}
              </div>
              <p className="descripcion-card">
                Registro como persona individual.
              </p>
            </Card>
            <Card
              className={`step-card ${isCompany === true ? "selected" : ""}`}
              onClick={() => setIsCompany(true)}
            >
              <div className="header-card">
                <h3 className="card-title">Equipo/Compañía</h3>
                {isCompany === true && (
                  <CheckCircleOutlined className="check-icon" />
                )}
              </div>
              <p className="descripcion-card">
                Registro como parte de un equipo o compañía.
              </p>
            </Card>
          </div>
          <button
            type="primary"
            disabled={isCompany === null}
            onClick={() => setCurrentStep(currentStep + 1)}
            className="boton-primer-step"
          >
            Continuar
          </button>
        </div>
      ),
    },
    {
      title: "Información de Contacto",
      content: (
        <StepTwo
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isCompany={isCompany}
          setCompanyName={setCompanyName}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          companyName={companyName}
        />
      ),
    },
    {
      title: "Categorías de Interés",
      content: (
        <div className="step-content">
          <div className="step-two-content">
            <div className="step-content-left">
              <h5>Selecciona tu Categoría de Interés</h5>
              <p>
                Elige lo que quieres enseñar. Ten en cuenta que esto se puede
                modificar mas adelante
              </p>
            </div>
            <div className="step-content-right">
              <div className="container-check">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Checkbox.Group
                    options={["Programación", "Trading"]}
                    value={selectedCategories}
                    className="checkbox-group"
                    onChange={(values) => setSelectedCategories(values)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Checkbox.Group
                    options={["Deporte", "Idiomas"]}
                    value={selectedCategories}
                    className="checkbox-group"
                    onChange={(values) => setSelectedCategories(values)}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Checkbox.Group
                    options={["Finanzas", "Estilo de vida"]}
                    value={selectedCategories}
                    className="checkbox-group"
                    onChange={(values) => setSelectedCategories(values)}
                  />
                </div>
              </div>

              <div className="step-button-group">
                <button
                  className="step-back-button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowLeftOutlined /> Atrás
                </button>
                <button
                  className="boton-primer-step"
                  type="primary"
                  onClick={() => navigate("/PanelCursos")}
                >
                  Finalizar
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="step-page">
        <Steps current={currentStep} items={steps} />
        <div className="steps-container">
          <div className="steps-content">{steps[currentStep].content}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StepByStep;
