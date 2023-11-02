import React, { useEffect } from "react";
import Rutas from "./componentes/rutas/Rutas";
import { analytics, performance } from "../firebaseConfig";

function App() {
  useEffect(() => {
    const analyticsInstance = analytics;

    if (analyticsInstance && analyticsInstance.logEvent) {
      analyticsInstance.logEvent("vistas_paginas");
    }

    const performanceInstance = performance;

    if (performanceInstance && performanceInstance.trace) {
      const trace = performanceInstance.trace("tiempo_de_carga");
      trace.start();
      trace.stop();
    }
  }, []);

  return <Rutas />;
}

export default App;
