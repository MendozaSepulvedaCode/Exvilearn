import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../estilos/navbar/NavBar.css";
import { autenticar } from "../../ayudas/autenticar";

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
        <Link to="https://exvilearn.b2clogin.com/exvilearn.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_LoginSignUp&client_id=0b3bbaa1-8d72-47d4-ac62-e7335a13a0af&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fexvilearn.web.app%2F&scope=openid&response_type=id_token&prompt=login">
          <button className="boton-sesion inactive">{inactive}</button>
        </Link>
      )}
    </div>
  );
}
