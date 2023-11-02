import React, { useState } from "react";
import "../../estilos/panel/profile.css";
import Swal from "sweetalert2";
import { BsGit, BsWhatsapp, BsDiscord } from "react-icons/bs";
import { AiTwotoneDelete, AiOutlineEdit } from "react-icons/ai";

function Profile({ profesorData }) {
  const [iconLinks, setIconLinks] = useState({});
  const [showInput, setShowInput] = useState({});
  const [inputValue, setInputValue] = useState({});

  const [selectedValue, setSelectedValue] = useState();

  function onSelect(value) {
    setSelectedValue(value);
  }

  const profileIconos = [
    {
      icon: <BsGit />,
      type: "git",
    },
    {
      icon: <BsWhatsapp />,
      type: "whatsapp",
    },
    {
      icon: <BsDiscord />,
      type: "discord",
    },
  ];

  const mostrarInput = (type) => {
    Swal.fire({
      title: "Ingrese el enlace",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#107acc",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        agregarLink(type, result.value);
      }
    });
  };

  const ocultarInput = (type) => {
    setShowInput((prev) => ({ ...prev, [type]: false }));
    setInputValue((prev) => ({ ...prev, [type]: "" }));
  };

  const agregarLink = (type, link) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (urlPattern.test(link)) {
      setIconLinks((prev) => ({ ...prev, [type]: link }));
      ocultarInput(type);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El formato del enlace no es válido. Asegúrate de ingresar una URL válida.",
        confirmButtonColor: "#107acc",
      });
    }
  };
  const cambioEscribir = (e, type) => {
    setInputValue((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const editarLink = (type) => {
    Swal.fire({
      title: `Editar ${type}`,
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#107acc",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        setIconLinks((prev) => ({ ...prev, [type]: result.value }));
      }
    });
  };

  const borrarLink = (type) => {
    setIconLinks((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-left">
          <div
            className="profile-image"
            style={{ backgroundImage: `url(${profesorData.Url_foto})` }}
          ></div>
          <div className="profile-name">
            <h5>
              {profesorData.Nombre} {profesorData.Apellido}
            </h5>
          </div>
          <div className="profile-stats">
            <div className="stats">
              <h6>0</h6>
              <p>Cursos</p>
            </div>
            <div className="stats">
              <h6>0</h6>
              <p>Alumnos</p>
            </div>
            <div className="stats">
              <h6>0</h6>
              <p>Lesiones</p>
            </div>
          </div>
        </div>
        <div className="container-iconos">
          {profileIconos.map((profileIcon, index) => (
            <div key={index} className="profile-iconos">
              {iconLinks[profileIcon.type] ? (
                <div className="link-display">
                  <a
                    href={iconLinks[profileIcon.type]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profileIcon.icon}
                  </a>
                  <div className="edit-delete-buttons">
                    <button
                      onClick={() => editarLink(profileIcon.type)}
                      className="profile-editar-boton"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => borrarLink(profileIcon.type)}
                      className="profile-eliminar-boton"
                    >
                      <AiTwotoneDelete />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="boton-icono">
                  <div className="profile-social-media">
                    <a href="#" onClick={() => mostrarInput(profileIcon.type)}>
                      {profileIcon.icon}
                    </a>
                  </div>
                  {showInput[profileIcon.type] ? (
                    <div className="link-input">
                      <input
                        type="text"
                        placeholder="Ingrese el enlace"
                        value={inputValue[profileIcon.type] || ""}
                        onChange={(e) => cambioEscribir(e, profileIcon.type)}
                      />
                    </div>
                  ) : (
                    <button onClick={() => mostrarInput(profileIcon.type)}>
                      +
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
