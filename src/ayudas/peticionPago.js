import { autenticar } from "../ayudas/autenticar";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export function peticionPago(callback) {
  const { valid, nombre, apellido, correo } = autenticar();

  if (!valid) {
    Swal.fire({
      icon: "error",
      title: "Inicio de sesión requerido",
      text: "Debe iniciar sesión para poder pagar.",
      confirmButtonColor: "#107acc",
    });
    return;
  }

  const carritoFromCookie = Cookies.get("carrito");
  const carrito = carritoFromCookie ? JSON.parse(carritoFromCookie) : [];

  const url = `${import.meta.env.VITE_API_PAGO}/crear-orden`;

  const items = carrito.map((producto) => ({
    id: producto.id,
    title: producto.titulo,
    description: "Descripcion del curso",
    unit_price: parseFloat(producto.precio),
    quantity: 1,
  }));

  const data = {
    items: items,
    azureId: 1321321,
    name: `Jose Mendoza`,
    email: "correo@gmail.com",
  };

  console.log(data);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.pago_mer) {
        callback(data.pago_mer);
      }
    })
    .catch((error) => {
      console.error("Error al realizar la petición:", error);
    });
}
