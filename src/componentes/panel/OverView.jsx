import "../../estilos/panel/overview.css";
import {
  FaChalkboardTeacher,
  FaLaptop,
  FaCertificate,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Profile from "./Profile";
import MenuLateral from "./navegacion/MenuLateral";
import { Progress } from "antd";
import { Input } from "antd";
import RightMenu from "../Navbar/RightMenu";

function OverView() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

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
      icon: <FaChalkboardTeacher />,
      itemNumber: 5,
      text: "Cursos",
    },
    {
      icon: <FaLaptop />,
      itemNumber: 190,
      text: "Lesiones",
    },
    {
      icon: <FaCertificate />,
      itemNumber: 1981,
      text: "Estudiantes",
    },
    {
      icon: <FaCertificate />,
      itemNumber: 1981,
      text: "Estudiantes",
    },
  ];

  const data = [];

  for (let i = 1; i <= 20; i++) {
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
    <div className="over-view">
      <MenuLateral />
      <div className="over-with-nav">
        <div className="nav-over">
          <RightMenu />
        </div>
        <div className="over-container">
          <div className="over-container-left">
            <div className="over-encabezado">
              <div className="over-header-title">
                <h4 className="over-nombre-persona">Hola, Jose</h4>
                <p>{getCurrentDate()}</p>
              </div>
              <div className="over-header-button">
                <button>
                  Crear curso <AiOutlinePlus />
                </button>
              </div>
            </div>
            <div className="over-detail-user">
              {overUser.map((overUser, index) => (
                <div key={index} className="over-detail-card">
                  <div>
                    <h5 className="over-text-detail">{overUser.text}</h5>
                    <p className="over-number-detail">
                      {overUser.itemNumber} <span>+3%</span>
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
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.image}
                            alt="Usuario"
                            className="over-imagen-table"
                          />
                        </td>
                        <td className="name-table-stats">{item.courseName}</td>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="over-container-right">
            <div>
              <Profile />
            </div>
            <div className="over-balance">
              <div className="over-balance">
                <div className="balance-container">
                  <h2 className="balance-header">Balance Total</h2>
                  <div className="balance-amount">$10,000</div>
                  <p className="balance-description">Es tu balance del mes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
