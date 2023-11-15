import { useEffect } from "react";
import { autenticar } from "./autenticar";

const Almacenar = () => {
  useEffect(() => {
    const url = window.location.href;
    const token = url.split("#id_token=")[1];

    if (token) {
      const cookieName = "n2s8t9p1q6z7w";

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      document.cookie = `${cookieName}=${token}; expires=${expirationDate.toUTCString()}; path=/;`;

      const newUrl = window.location.href.split("#")[0];
      window.history.replaceState({}, document.title, newUrl);

      const esTokenValido = autenticar();

      if (!esTokenValido) {
        console.error("Inicio de sesión fallido");
      } else {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        if (
          decodedToken &&
          decodedToken.sub &&
          decodedToken.given_name &&
          decodedToken.family_name &&
          decodedToken.emails &&
          decodedToken.idp
        ) {
          const data = {
            ID_Azure: decodedToken.sub,
            Nombre: decodedToken.given_name,
            Apellido: decodedToken.family_name,
            Correo: decodedToken.emails[0],
            Idp: decodedToken.idp,
          };

          fetch(`${import.meta.env.VITE_API_USER}/new_user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(
                  "Error en la solicitud POST HTTP: " + response.status
                );
              }
            })

            .then((data) => {
              window.location.reload();
            })

            .catch((error) =>
              console.error("Error en la solicitud POST:", error)
            );
        } else {
          console.error("Error al decodificar el token");
        }
      }
    }
  }, []);

  return null;
};

export default Almacenar;
