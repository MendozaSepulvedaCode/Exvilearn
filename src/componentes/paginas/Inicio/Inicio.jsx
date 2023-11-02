import CursoRecomendadoContainer from "../Inicio/CursoContainer";
import { HeaderInicio } from "../Inicio/Header/Header";
import CursosBackHeader from "../Inicio/CursosBackHeader";
import React, { useState, useEffect } from "react";
import IncentivoProfesor from "./IncentivoProfesor";
import Categorias from "./Categorias";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

function Inicio({ carrito, setCarrito }) {
  const cantidadCursos = 20;
  const cursos = [];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % tarjetas.length);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setCurrentCardIndex((prevIndex) =>
        prevIndex === 0 ? tarjetas.length - 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % tarjetas.length);
    }
  };

  const tarjetas = [
    {
      imageSrc:
        "https://storagexvilearn.blob.core.windows.net/imagenes/escritorio.webp",
      imageSrcMobile:
        "https://storagexvilearn.blob.core.windows.net/imagenes/escritorio.webp",
      cardTitle: "Enfocate y aprende la nueva forma de estudiar",
      cardParagraph: "Conoce la forma de enseñar de diferentes instructores",
      buttonText: "Ir a cursos",
      buttonLink: "/",
    },
    {
      imageSrc:
        "https://storagexvilearn.blob.core.windows.net/imagenes/escritorio2.webp",
      imageSrcMobile:
        "https://storagexvilearn.blob.core.windows.net/imagenes/escritorio2.webp",
      cardTitle: "Conviertete en instructor y genera conocimiento",
      cardParagraph:
        "En Exvilearn puedes revolcionar la forma en la que se aprende",
      buttonText: "Ir a Enseñar",
      buttonLink: "/VistaEnseña",
    },
  ];

  for (let i = 1; i <= cantidadCursos; i++) {
    cursos.push({
      id: i,
      nombre: `Jose Mendoza ${i}`,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe8_XyeX7Dd698Jzt9mDMzd-x4vZOJ2i96bw&usqp=CAU",
      precio: `50000`,
      categoria: "Trading",
      duracion: "20h 57m",
      participantes: "2067",
      lesiones: `20`,
      titulo: "Aprende estrategias de trading avanzadas",
      imagen:
        "https://www.tradingybolsaparatorpes.com/wp-content/uploads/2022/10/Curso-de-Trading-Gratis.jpg",
    });
  }

  return (
    <div>
      <Navbar />
      <HeaderInicio
        tarjetas={tarjetas}
        currentCardIndex={currentCardIndex}
        onArrowClick={handleArrowClick}
      />
      <CursosBackHeader />
      <CursoRecomendadoContainer
        cursos={cursos}
        carrito={carrito}
        setCarrito={setCarrito}
      />
      <IncentivoProfesor />
      <Categorias />
      <Footer />
    </div>
  );
}

export default Inicio;
