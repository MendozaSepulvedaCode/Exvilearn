import "../../../estilos/inicio/enseña.css";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyCheckAlt,
  FaLaptop,
  FaCertificate,
  FaClock,
} from "react-icons/fa";

function BeneficiosEnseña() {
  const beneficios = [
    {
      iconColor: "#f29e20",
      cardColor: "#fef5ea",
      icon: <FaChalkboardTeacher />,
      title: "Comparte tus conocimientos",
      description:
        "Imparte tus conocimientos y habilidades a estudiantes de todo el mundo. Ayuda a moldear futuros profesionales y comparte tu experiencia.",
    },
    {
      iconColor: "#cf64f4",
      cardColor: "#faeffe",
      icon: <FaUsers />,
      title: "Conecta con estudiantes globales",
      description:
        "Conecta con estudiantes de diversas partes del mundo. Amplía tu alcance y contribuye al crecimiento académico de una comunidad global.",
    },
    {
      iconColor: "#1bbcb2",
      cardColor: "#e9fbf9",
      icon: <FaMoneyCheckAlt />,
      title: "Genera ingresos adicionales",
      description:
        "Gana dinero enseñando y compartiendo tus cursos. Genera ingresos pasivos a medida que más estudiantes se unan a tus clases.",
    },
    {
      iconColor: "#8b64f6",
      cardColor: "#f2f0fe",
      icon: <FaClock />,
      title: "Enseña a tu ritmo",
      description:
        "Crea los cursos a tu tiempos y avanza a tu ritmo. Accede a los contenidos de los cursos cuando más te convenga.",
    },
  ];

  return (
    <div className="beneficios-container">
      <div className="titulo-header-enseña">
        <h3 className="beneficios-heading">
          ¿POR QUE DEBERIAS UNIRTE A <span>Exvilearn</span>?
        </h3>
        <p>
          Unirse a Exvilearn es una oportunidad para los profesores de ampliar
          su alcance, influencia y potencial de ingresos, al tiempo que
          <span> contribuyen a la educación en línea</span> y la formación de la
          próxima generación de estudiantes.
        </p>
      </div>
      <div className="beneficios-list">
        {beneficios.map((beneficio, index) => (
          <div
            key={index}
            className="beneficio-card"
            style={{ backgroundColor: beneficio.cardColor }}
          >
            <div
              className="icon"
              style={{ backgroundColor: beneficio.iconColor }}
            >
              {beneficio.icon}
            </div>
            <h4 className="title">{beneficio.title}</h4>
            <p className="description">{beneficio.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeneficiosEnseña;
