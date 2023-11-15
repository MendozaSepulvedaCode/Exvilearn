import { autenticar } from "./autenticar";
import { decode } from "./decode";

const { valid } = autenticar();

export const validarProfesor = async () => {
  if (!valid) {
    return { redireccionar: true, error: null };
  } else {
    const cookieName = "n2s8t9p1q6z7w";
    const decodeToken = decode(cookieName);

    const data = {
      ID_Azure: decodeToken.sub,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_PROFE}validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud a la API");
      }

      const responseData = await response.json();

      const isValid = responseData.Nombre && responseData.Apellido;

      return { isValid, data: responseData };
    } catch (error) {
      console.error("Error:", error.message);
      return { isValid: false, data: null, error: error.message };
    }
  }
};
