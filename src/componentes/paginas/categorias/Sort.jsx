import React, { useState } from "react";
import "../../../estilos/categorias/categorias.css";
import { FaAngleUp, FaAngleDown, FaStar } from "react-icons/fa";

const options = {
  Valoracion: [
    {
      id: 1,
      label: (
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      ),
    },
    {
      id: 2,
      label: (
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      ),
    },
    {
      id: 3,
      label: (
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      ),
    },
  ],
  Precio: [
    { id: 1, label: "Gratis" },
    { id: 2, label: "De pago" },
  ],
  Duracion: [
    { id: 1, label: "0 - 1 hora" },
    { id: 2, label: "1 - 3 horas" },
    { id: 3, label: "Entre 3 y 6 horas" },
    { id: 4, label: "6 - 17 horas" },
    { id: 5, label: "17 horas o mas" },
  ],
};

function Sort() {
  const [activeSections, setActiveSections] = useState([]);

  const handleSectionClick = (section) => {
    if (activeSections.includes(section)) {
      setActiveSections(activeSections.filter((item) => item !== section));
    } else {
      setActiveSections([...activeSections, section]);
    }
  };

  const handleFilterChange = (category, option) => {};

  return (
    <div className="container-sort-categorias-left">
      <div className="sort-container">
        <div className="accordion">
          {Object.keys(options).map((category, index) => (
            <div className="accordion-item" key={index}>
              <div
                className={`accordion-item-header ${
                  activeSections.includes(category) ? "active" : ""
                }`}
                onClick={() => handleSectionClick(category)}
              >
                {category}
                {activeSections.includes(category) ? (
                  <FaAngleUp style={{ marginLeft: "5px" }} />
                ) : (
                  <FaAngleDown style={{ marginLeft: "5px" }} />
                )}
              </div>
              <div
                className={`accordion-item-body ${
                  activeSections.includes(category) ? "active" : ""
                }`}
              >
                {options[category].map((option) => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleFilterChange(category, option.label)
                      }
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sort;
