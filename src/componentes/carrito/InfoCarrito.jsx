import React, { useState, useEffect } from "react";
import "../../estilos/carrito/carrito.css";
import { ImPriceTag } from "react-icons/im";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { peticionPago } from "../../ayudas/peticionPago";
import { tiempoTranscurrido } from "../../ayudas/tiempoTranscurrido";

function InfoCarrito({ carrito, setCarrito }) {
  const [codigoPromocional, setCodigoPromocional] = useState("");
  const [promociones, setPromociones] = useState([]);

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + parseInt(producto.Detalles.Curso.Precio, 10),
      0
    );
  };

  const aplicarPromocion = () => {
    if (codigoPromocional !== "" && !promociones.includes(codigoPromocional)) {
      setPromociones([...promociones, codigoPromocional]);
      setCodigoPromocional("");
    }
  };

  const formatearPrecio = (precio) => {
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: "COP",
    });
    return formatter.format(precio).replace(/\D00(?=\D*$)/, "");
  };

  const eliminarProducto = (id) => {
    const updatedCarrito = carrito.filter(
      (producto) => producto.Detalles.Curso.ID_curso !== id
    );
    setCarrito([...updatedCarrito]);

    const carritoString = JSON.stringify(updatedCarrito);
    Cookies.set("carrito", carritoString, { expires: 7 });
  };

  const pagarPost = async () => {
    try {
      await peticionPago((url) => {
        window.open(url, "_blank");
      });
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
  };

  useEffect(() => {
    const carritoFromCookie = Cookies.get("carrito");
    if (carritoFromCookie) {
      const parsedCarrito = JSON.parse(carritoFromCookie);
      setCarrito(parsedCarrito);
    }
  }, []);

  return (
    <div className="carrito-de-compras">
      <div className="carrito-left">
        <div className="carrito-titulo">
          <h5>Carrito de Compras</h5>
          <p>
            {carrito.length
              ? `${carrito.length} ítems en el carrito`
              : "No hay ítems en el carrito"}
          </p>
        </div>
        <hr className="linea-separadora" />
        {carrito.length > 0 && (
          <div className="items-carrito">
            {carrito.map((producto) => (
              <div key={producto.Detalles.Curso.ID_curso}>
                <div className="container-info-card">
                  <div className="curso-card-info">
                    <div>
                      <img
                        src={producto.Detalles.Curso.Miniatura}
                        alt={producto.Detalles.Curso.Titulo}
                        className="img-curso"
                      />
                    </div>
                    <div className="info-card">
                      <p className="nombre-curso">
                        {producto.Detalles.Curso.Titulo}
                      </p>
                      <p className="autor-curso">
                        Por{" "}
                        {`${producto.Detalles.Profesor.Nombre} ${producto.Detalles.Profesor.Apellido}`}
                      </p>
                      <div
                        className="foot-curso"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <p className="categoria-curso">
                          {producto.Detalles.Curso.Categoria}
                        </p>
                        <span style={{ margin: "0 5px", color: "#bdbfc1" }}>
                          &bull;
                        </span>
                        {producto &&
                        producto.Detalles &&
                        producto.Detalles.Curso &&
                        producto.Detalles.Curso.Secciones ? (
                          <p className="lesiones-curso">
                            {
                              Object.keys(producto.Detalles.Curso.Secciones)
                                .length
                            }{" "}
                            clases
                          </p>
                        ) : (
                          <p>No se encontraron clases</p>
                        )}
                        <span style={{ margin: "0 5px", color: "#bdbfc1" }}>
                          &bull;
                        </span>
                        <p className="horas-curso">
                          Publicado hace{" "}
                          {tiempoTranscurrido(
                            producto.Detalles.Curso.FechaPubliBlob
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="acciones-curso">
                    <div>
                      <button
                        className="eliminar-button"
                        onClick={() =>
                          eliminarProducto(producto.Detalles.Curso.ID_curso)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="precio-curso">
                      <p>${formatearPrecio(producto.Detalles.Curso.Precio)}</p>{" "}
                      <ImPriceTag />
                    </div>
                  </div>
                </div>
                <hr className="linea-separadora" />
              </div>
            ))}
          </div>
        )}

        {!carrito.length && (
          <Link to="/">
            <button className="btn-seguir-comprando">Seguir Comprando</button>
          </Link>
        )}
      </div>
      {carrito.length > 0 && (
        <div className="detalle-orden">
          <div>
            <p>Total:</p>
            <h5>${formatearPrecio(calcularTotal())}</h5>
          </div>
          <button onClick={pagarPost} className="btn-pagar">
            Pagar
          </button>
          <div className="codigo-promocional-container">
            <hr className="linea-separadora" />
            <div>
              <h6>Promociones</h6>
            </div>
            <div className="input-promociones">
              <input
                className="codigo-input"
                type="text"
                value={codigoPromocional}
                onChange={(e) =>
                  setCodigoPromocional(e.target.value.toUpperCase())
                }
                placeholder="Ingresar código promocional"
              />
              <button className="aplicar-button" onClick={aplicarPromocion}>
                Aplicar
              </button>
            </div>
            <div className="promociones-agregadas">
              {promociones.map((promo, index) => (
                <div key={promo} className="promocion-agregada">
                  <p>{promo}</p>
                  <button
                    onClick={() => {
                      const updatedPromociones = promociones.filter(
                        (item) => item !== promo
                      );
                      setPromociones(updatedPromociones);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoCarrito;
