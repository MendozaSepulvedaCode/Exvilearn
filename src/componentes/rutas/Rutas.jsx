import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Inicio from "../paginas/Inicio/Inicio";
import VistaEnseña from "..//paginas/enseña/VistaEnseña";
import Carrito from "../carrito/Carrito";
import StepByStep from "../paginas/steps/StepByStep";
import PanelCursos from "../panel/PanelCursos";
import Almacenar from "../../ayudas/Almacenar";
import PanelVideos from "../panel/navegacion/creacion/PanelVideos";
import Categorias from "../paginas/categorias/Categorias";
import CursoDetail from "../paginas/detalles/CursoDetail";
import CursoUsuario from "../paginas/cursos/CursoUsuario";
import { LoaderProvider } from "../../ayudas/Loader";
import { autenticar } from "../../ayudas/autenticar";

function Rutas() {
  const [carrito, setCarrito] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apicargablo.azurewebsites.net/course"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const routes = [
    { path: "/", component: Inicio, props: { carrito, setCarrito, cursos } },
    { path: "/VistaEnseña", component: VistaEnseña },
    { path: "/Carrito", component: Carrito, props: { carrito, setCarrito } },
    { path: "/StepByStep", component: StepByStep },
    { path: "/PanelCursos", component: PanelCursos },
    { path: "/PanelCursos/panel-videos", component: PanelVideos },

    { path: "/categorias/:categoria", component: Categorias, props: { cursos } },
    {
      path: "/detalle-curso/id/:id",
      component: CursoDetail,
      props: { cursos },
    },
    {
      path: "/panel-usuario",
      component: CursoUsuario,
    },
  ];

  const rutasProtegidas = [
    "/StepByStep",
    "/PanelCursos",
    "/PanelCursos/panel-videos",
    "/panel-usuario",
  ];

  const ProtectedRoute = ({ path, element }) => {
    const { valid } = autenticar();
    return valid ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <LoaderProvider>
        <Almacenar />
        <Routes>
          {routes.map((route, index) => {
            if (rutasProtegidas.includes(route.path)) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.props ? (
                      <ProtectedRoute
                        path={route.path}
                        element={React.createElement(
                          route.component,
                          route.props
                        )}
                      />
                    ) : (
                      <ProtectedRoute
                        path={route.path}
                        element={React.createElement(route.component)}
                      />
                    )
                  }
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.props
                      ? React.createElement(route.component, route.props)
                      : React.createElement(route.component)
                  }
                />
              );
            }
          })}
        </Routes>
      </LoaderProvider>
    </Router>
  );
}

export default Rutas;
