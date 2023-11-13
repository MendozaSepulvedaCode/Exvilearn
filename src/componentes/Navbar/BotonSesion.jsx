import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { autenticar } from "../../ayudas/autenticar";
import "../../estilos/navbar/Navbar.css";

export function BotonSesion({ inactive = "Iniciar Sesión" }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const { valid, nombre, apellido } = autenticar();

    if (valid) {
      setUserData({ nombre: nombre, apellido: apellido });
    }
  }, []);

  const initials = userData
    ? `${userData.nombre?.charAt(0).toUpperCase()}${userData.apellido
        ?.charAt(0)
        .toUpperCase()}`
    : "";

  return (
    <div>
      {userData ? (
        <div className="circulo-iniciales">
          <span>{initials}</span>
        </div>
      ) : (
        <Link to={import.meta.env.VITE_LOGIN_B2C_AZURE}>
          <button className="boton-sesion inactive">{inactive}</button>
        </Link>
      )}
    </div>
  );
}
