import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "../../../estilos/panel/navegacion.css";
import { useNavigate } from "react-router-dom";

const MenuLateral = () => {
  const [current, setCurrent] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const redireccionar = (ruta) => {
    navigate(ruta);
  };

  const clickItem = (item) => {
    if (item.onClick) {
      item.onClick();
    }
  };

  const items = [
    {
      key: "companyName",
      icon: (
        <img
          src="https://blobstorageexv.blob.core.windows.net/imagenes/logo.png"
          alt="logo"
          style={{ width: '20px' }}
        />
      ),
      label: "Exvilearn",
    },
    {
      key: "courses",
      icon: <AppstoreOutlined />,
      label: "Panel",
      onClick: () => redireccionar("/PanelCursos"),
    },
    {
      key: "messages",
      icon: <MessageOutlined />,
      label: "Mensajes",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Perfil",
    },
    {
      key: "configuration",
      icon: <SettingOutlined />,
      label: "Configuracion",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Salir",
      onClick: () => redireccionar("/"),
    },
  ];

  const hideSidebar = () => setSidebarVisible(false);

  useEffect(() => {
    setCurrent(null);
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleMouseEnter = () => {
    setSidebarVisible(true);
  };

  const handleMouseLeave = (e) => {
    const relatedTarget = e.relatedTarget;
    if (relatedTarget) {
      const isInside =
        relatedTarget.closest && relatedTarget.closest(".custom-barra-lateral");
      if (!isInside) {
        setSidebarVisible(false);
      }
    }
  };

  return (
    <div className="custom-barra-lateral" onMouseLeave={handleMouseLeave}>
      <div
        className={`custom-visible-barra ${
          sidebarVisible ? "expanded" : "collapsed"
        }`}
        onMouseEnter={handleMouseEnter}
      >
        <ul className="custom-menu-lateral" onClick={hideSidebar}>
          {items.map((item) => (
            <li key={item.key} onClick={() => clickItem(item)}>
              <div className="custom-icon">{item.icon}</div>
              <div className="custom-label">
                {sidebarVisible ? item.label : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuLateral;
