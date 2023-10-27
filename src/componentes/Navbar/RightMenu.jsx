import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import "../../estilos/navbar/Navbar.css";
import { BotonSesion } from "../Navbar/BotonSesion";
import { HiLogout } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { autenticar } from "../../ayudas/autenticar";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../ayudas/Loader";

const RightMenu = ({ mode, userData }) => {
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const { valid } = autenticar();
    setValid(valid);
  }, []);

  const eliminarCookie = (nombre) => {
    showLoader();
    document.cookie = `${nombre}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setValid(false);
    hideLoader();
    navigate("/");
    window.location.reload();
  };



  const items = valid
    ? [
        {
          icon: <BotonSesion userData={userData} />,
          key: "submenu",
          children: [
            {
              label: "Configuracion",
              key: "submenu-item-1",
              icon: <FiSettings />,
            },
            {
              label: "Panel de usuario",
              key: "submenu-item-2",
              icon: <AiOutlineDashboard />,
            },
            {
              label: "Cerrar sesion",
              key: "submenu-item-3",
              icon: <HiLogout />,
              onClick: () => eliminarCookie("n2s8t9p1q6z7w"),
            },
          ],
        },
      ]
    : [
        {
          icon: <BotonSesion userData={userData} />,
          key: "submenu",
        },
      ];

  const menuStyle = {
    borderBottom: "none",
    lineHeight: "0px",
    width: "12em",
    marginTop: "5px",
    border: "none",
  };

  return (
    <div>
      <Menu mode={mode} items={items} style={menuStyle} />
    </div>
  );
};

export default RightMenu;
