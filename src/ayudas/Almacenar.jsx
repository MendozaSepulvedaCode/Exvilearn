import { useEffect } from "react";
import { autenticar } from "./autenticar";

const Almacenar = () => {
  useEffect(() => {
    const url = window.location.href;
    const token = url.split("#id_token=")[1];

    if (token) {
      const cookieName = "n2s8t9p1q6z7w";

      document.cookie = `${cookieName}=${token}; path=/;`;

      const newUrl = window.location.href.split("#")[0];
      window.history.replaceState({}, document.title, newUrl);

      const esTokenValido = autenticar();

      if (!esTokenValido) {
        console.error("Inicio de sesion fallido");
      }
    }
  }, []);

  return null;
};

export default Almacenar;
