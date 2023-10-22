import React, { useState } from "react";
import "../../../../estilos/panel/panelcursos.css";
import { Steps, Button } from "antd"; // Agrega importación del componente Button
import PanelInfo from "./PanelInfo";
import PanelSecciones from "./PanelSecciones";

const { Step } = Steps;

function PanelVideos() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Información básica",
      content: <PanelInfo setCurrentStep={setCurrentStep} />, // Pasa setCurrentStep como prop
    },
    {
      title: "Secciones",
      content: <PanelSecciones />,
    },
  ];

  return (
    <div className="curso-steps-container">
      <div className="steps-header">
        <Steps current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      </div>
      <div className="steps-view">{steps[currentStep].content}</div>
      <div className="botones-container">
        {currentStep === steps.length - 1 && ( // Mostrar botón solo en el último paso
          <Button onClick={() => console.log("Finalizar creación")}>
            Finalizar Creación
          </Button>
        )}
      </div>
    </div>
  );
}

export default PanelVideos;
