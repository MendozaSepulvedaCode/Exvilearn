import React, { useState, useEffect } from "react";
import "../../estilos/navbar/Navbar.css";
import { Menu } from "antd";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useLoader } from "../../ayudas/Loader";
import { autenticar } from "../../ayudas/autenticar";
import { decode } from "../../ayudas/decode";

const LeftMenu = ({ mode }) => {
  const navigate = useNavigate();
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const { showLoader, hideLoader } = useLoader();
  const { valid } = autenticar();

  const redireccionar = (ruta) => {
    navigate(ruta);
  };

  const validarProfesor = () => {
    showLoader();
    if (!valid) {
      redireccionar("/VistaEnseña");
      hideLoader();
    } else {
      const cookieName = "n2s8t9p1q6z7w";
      const decodeToken = decode(cookieName);

      const data = {
        ID_Azure: decodeToken.sub,
      };

      fetch("https://apiuserprofe.azurewebsites.net/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud a la API");
          }
          return response.json();
        })
        .then((data) => {
          hideLoader();
          if (data.Nombre && data.Apellido) {
            redireccionar("/PanelCursos");
          } else {
            redireccionar("/VistaEnseña");
          }
        })
        .catch((error) => {
          hideLoader();
          console.error("Error:", error.message);
        });
    }
  };

  useEffect(() => {
    const carritoFromCookie = Cookies.get("carrito");
    if (carritoFromCookie) {
      try {
        const parsedCarrito = JSON.parse(carritoFromCookie);
        setCantidadCarrito(parsedCarrito.length);
      } catch (error) {
        console.error("Error al analizar el valor de la cookie:", error);
      }
    } else {
    }
  }, []);

  const items = [
    {
      icon: <HomeOutlined />,
      label: "Inicio",
      key: "item-1",
      onClick: () => redireccionar("/"),
    },
    {
      icon: <BookOutlined />,
      label: "Enseña",
      key: "item-3",
      onClick: () => validarProfesor(),
    },
    {
      icon: (
        <div style={{ position: "relative" }}>
          <LuShoppingBag />
          {cantidadCarrito > 0 && (
            <span className="carrito-cantidad">{cantidadCarrito}</span>
          )}
        </div>
      ),
      label: "Carrito",
      key: "item-4",
      onClick: () => redireccionar("/Carrito"),
    },
    {
      label: "Categorias",
      key: "item-2",
      style: {
        marginTop: "7px",
      },
      children: [
        {
          label: "Trading",
          key: "subitem-1",
        },
        {
          label: "Programacion",
          key: "subitem-2",
          children: [
            {
              label: "Desarollo Web",
              key: "subitem2-1",
            },
            {
              label: "Fundamentos de programacion",
              key: "subitem2-2",
            },
          ],
        },
        {
          label: "Idiomas",
          key: "subitem-3",
          children: [
            {
              label: "Ingles",
              key: "subitem3-1",
            },
            {
              label: "Frances",
              key: "subitem3-2",
            },
            {
              label: "Portugues",
              key: "subitem3-3",
            },
          ],
        },
        {
          label: "Deporte",
          key: "subitem-4",
        },
      ],
    },
  ];
  return (
    <Menu
      mode={mode}
      items={items}
      className="menu-left-ant"
      style={{
        borderBottom: "none",
        lineHeight: "0px",
        justifyContent: "space-evenly",
        hover: "none",
      }}
    />
  );
};

export default LeftMenu;
