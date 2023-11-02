import { autenticar } from "./autenticar";
import { decode } from "./decode";

const { valid } = autenticar();

export const validarProfesor = () => {
  if (!valid) {
    return { redireccionar: true, error: null };
  } else {
    const cookieName = "n2s8t9p1q6z7w";
    const decodeToken = decode(cookieName);

    const data = {
      ID_Azure: decodeToken.sub,
    };

    return fetch("https://apiuserprofe.azurewebsites.net/validate", {
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
        if (data.Nombre && data.Apellido) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        return false;
      });
  }
};
