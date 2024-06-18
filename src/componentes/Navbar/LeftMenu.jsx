import React, { useState, useEffect } from "react";
import "../../estilos/navbar/Navbar.css";
import { Menu } from "antd";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { validarProfesor } from "../../ayudas/validarprofesor";
import { useLoader } from "../../ayudas/Loader";

const LeftMenu = ({ mode }) => {
  const navigate = useNavigate();
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const { showLoader, hideLoader } = useLoader();

  const redireccionar = (ruta) => {
    navigate(ruta);
    window.location.href = window.location.href;
  };

  const reCategoria = (ruta, categoriaNombre) => {
    navigate(`${ruta}/${categoriaNombre}`);
    window.location.reload();
  };

  const manejoValidacion = async () => {
    showLoader();
    try {
      const resultado = await validarProfesor();

      if (typeof resultado.isValid === "undefined") {
        resultado.isValid = false;
      }

      if (!resultado.isValid) {
        redireccionar("/VistaEnseña");
        hideLoader();
      } else {
        redireccionar("/PanelCursos");
        hideLoader();
      }
    } catch (error) {
      console.error("Ocurrió un error durante la validación:", error);
      hideLoader();
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
      onClick: () => manejoValidacion(),
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
          onClick: () => reCategoria("/categorias", "trading"),
        },
        {
          label: "Programacion",
          key: "subitem-2",
          onClick: () => reCategoria("/categorias", "programacion"),
        },
        {
          label: "Idiomas",
          key: "subitem-3",
          onClick: () => reCategoria("/categorias", "idiomas"),
        },
        {
          label: "Deporte",
          key: "subitem-4",
          onClick: () => reCategoria("/categorias", "deporte"),
        },
        {
          label: "Finanzas",
          key: "subitem-5",
          onClick: () => reCategoria("/categorias", "finanzas"),
        },
        {
          label: "Estilo de vida",
          key: "subitem-6",
          onClick: () => reCategoria("/categorias", "estilo-de-vida"),
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
