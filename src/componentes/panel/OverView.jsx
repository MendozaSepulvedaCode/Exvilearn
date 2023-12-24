import "../../estilos/panel/overview.css";
import React, { useState, useEffect, useRef } from "react";
import {
  FaChalkboardTeacher,
  FaLaptop,
  FaCertificate,
  FaStar,
  FaStarHalfAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { AiOutlinePlus, AiOutlineInbox } from "react-icons/ai";
import Profile from "./Profile";
import PanelMovil from "./PanelMovil";
import MenuLateral from "./navegacion/MenuLateral";
import { Progress } from "antd";
import { Input } from "antd";
import RightMenu from "../Navbar/RightMenu";
import { Link } from "react-router-dom";
import { validarProfesor } from "../../ayudas/validarprofesor";
import { useLoader } from "../../ayudas/Loader";
import { useNavigate } from "react-router-dom";

function OverView() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [profesorData, setProfesorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      showLoader();
      try {
        const response = await validarProfesor();
        if (!response || response.redireccionar) {
          navigate("/");
        } else {
          setProfesorData(response);
        }
        hideLoader();
      } catch (error) {
        console.error("Ocurrió un error durante la validación:", error);
        hideLoader();
      }
    };

    fetchData();
  }, [navigate]);

  const getCurrentDate = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const day = now.getDay();
    const month = now.getMonth();
    const date = now.getDate();
    const year = now.getFullYear();

    const formattedDate = `${hour % 12 || 12}:${
      (minute < 10 ? "0" : "") + minute
    } ${hour >= 12 ? "pm" : "am"}, ${days[day]}, ${date} de ${
      months[month]
    } ${year}`;

    return formattedDate;
  };

  const overUser = [
    {
      icon: <FaCertificate />,
      itemNumber: 0,
      text: "Cursos",
    },
    {
      icon: <FaLaptop />,
      itemNumber: 0,
      text: "Lesiones",
    },
    {
      icon: <FaChalkboardTeacher />,
      itemNumber: 0,
      text: "Estudiantes",
    },
    {
      icon: <FaRegCalendarAlt />,
      itemNumber: 0,
      text: "Reuniones",
    },
  ];

  const data = [];

  for (let i = 1; i <= 0; i++) {
    const item = {
      id: i,
      image: "https://storagexvilearn.blob.core.windows.net/imagenes/joven.png",
      courseName: `Curso de programacion de php: Primeros pasos, de cero a mid ${i}`,
      progress: 75,
      rating: 3.7,
    };
    data.push(item);
  }

  return (
    <>
      <PanelMovil />
      <div className="over-view">
        <MenuLateral />
        <div className="over-with-nav">
          <div className="nav-over">
            <h5 className="over-panel-h5">Panel - Vista general</h5>
            <RightMenu />
          </div>
          {profesorData && profesorData.data && (
            <div className="over-container">
              <div className="over-container-left">
                <div className="over-encabezado">
                  <div className="over-header-title">
                    <h4 className="over-nombre-persona">
                      Hola, {profesorData.data.Nombre}
                    </h4>
                    <p>{getCurrentDate()}</p>
                  </div>
                  <div className="over-header-button">
                    <Link
                      to="/PanelCursos/panel-videos"
                      style={{ textDecoration: "none" }}
                    >
                      <button>
                        Crear curso <AiOutlinePlus />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="over-detail-user">
                  {overUser.map((overUser, index) => (
                    <div key={index} className="over-detail-card">
                      <div>
                        <h5 className="over-text-detail">{overUser.text}</h5>
                        <p className="over-number-detail">
                          {overUser.itemNumber} <span>+0%</span>
                        </p>
                      </div>
                      <div className="over-detail-icon">{overUser.icon}</div>
                    </div>
                  ))}
                </div>
                <div className="over-stats">
                  <div className="header-stats">
                    <h5>Usuarios</h5>
                    <div>
                      <Search
                        placeholder="Buscar cursos"
                        allowClear
                        onSearch={onSearch}
                        style={{
                          width: "30vw",
                          marginTop: "1.2rem",
                        }}
                        className="buscar-nav"
                      />
                    </div>
                  </div>
                  <div className="info-stats">
                    <table>
                      <thead>
                        <tr>
                          <th>Estudiante</th>
                          <th>Nombre del Curso</th>
                          <th>Progreso</th>
                          <th>Valoracion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="empty-data">
                              <div className="empty-data-content">
                                <AiOutlineInbox
                                  style={{ fontSize: "20em", color: "#e9e9e9" }}
                                />
                                <p>Aun no hay usuarios</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          data.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <img
                                  src={item.image}
                                  alt="Usuario"
                                  className="over-imagen-table"
                                />
                              </td>
                              <td className="name-table-stats">
                                {item.courseName}
                              </td>
                              <td className="progress-table-stats">
                                <Progress percent={item.progress} />
                              </td>
                              <td>
                                <div>
                                  {[...Array(Math.floor(item.rating))].map(
                                    (_, index) => (
                                      <FaStar
                                        key={index}
                                        style={{ marginRight: "5px" }}
                                        color="#ffc107"
                                      />
                                    )
                                  )}
                                  {item.rating % 1 !== 0 && (
                                    <FaStarHalfAlt
                                      style={{ marginRight: "3px" }}
                                      color="#ffc107"
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="over-container-right">
                <div>
                  <Profile profesorData={profesorData.data} />
                </div>
                <div className="over-balance">
                  <div className="over-balance">
                    <div className="balance-container">
                      <div className="balance-header">
                        <h5>Balance del mes</h5>
                        <p>
                          ${profesorData.data.Saldo} <span>+0%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OverView;
