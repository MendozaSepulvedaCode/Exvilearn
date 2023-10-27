export function decode(cookieName) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    .split("=")[1];
  const decodedToken = JSON.parse(atob(cookieValue.split(".")[1]));
  return decodedToken;
}
