import React, { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../../../estilos/inicio/header.css";

export function HeaderInicio({ tarjetas, currentCardIndex, onArrowClick }) {
  useEffect(() => {
    const interval = setInterval(() => {
      onArrowClick("right");
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [onArrowClick]);

  const handleArrowClick = (direction) => {
    onArrowClick(direction);
  };

  return (
    <div className="header">
      <div className={`HeaderRight`}>
        <div>
          <img
            src={
              window.innerWidth >= 769
                ? tarjetas[currentCardIndex].imageSrc
                : tarjetas[currentCardIndex].imageSrcMobile
            }
            alt="Cursos online"
          />
        </div>
        <div
          className={`ArrowIconContainer left`}
          onClick={() => handleArrowClick("left")}
        >
          <IoIosArrowBack className="ArrowIcon" />
        </div>
        <div
          className={`ArrowIconContainer right`}
          onClick={() => handleArrowClick("right")}
        >
          <IoIosArrowForward className="ArrowIcon" />
        </div>
      </div>
      <div className="content-card">
        <h5>{tarjetas[currentCardIndex].cardTitle}</h5>
        <p>{tarjetas[currentCardIndex].cardParagraph}</p>
        <a href={tarjetas[currentCardIndex].buttonLink}>
          <button>{tarjetas[currentCardIndex].buttonText}</button>
        </a>
      </div>
    </div>
  );
}
