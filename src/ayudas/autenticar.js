export function autenticar() {
  const cookieName = "n2s8t9p1q6z7w";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      const encryptedToken = cookie.substring(cookieName.length + 1);

      const tokenParts = encryptedToken.split(".");
      if (tokenParts.length !== 3) {
        return { valid: false, nombre: null, apellido: null };
      }

      const [header, payload, signature] = tokenParts;

      const parsedPayload = JSON.parse(atob(payload));

      const now = new Date();
      const expirationDate = new Date(parsedPayload.exp * 1000);
      if (now.getTime() > expirationDate.getTime()) {
        return { valid: false, nombre: null, apellido: null };
      }

      const nombre = parsedPayload.given_name;
      const apellido = parsedPayload.family_name;
      const correo = parsedPayload.emails[0];

      return { valid: true, nombre, apellido, correo };
    }
  }

  return { valid: false, nombre: null, apellido: null, correo: null };
}
