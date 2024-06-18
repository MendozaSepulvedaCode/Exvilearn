export function tiempoTranscurrido(fechaPublicacion) {
  const fechaPublicacionCurso = new Date(fechaPublicacion);
  const ahora = new Date();

  const diferencia = ahora.getTime() - fechaPublicacionCurso.getTime();

  const segundosTranscurridos = Math.floor(diferencia / 1000);
  const minutosTranscurridos = Math.floor(segundosTranscurridos / 60);
  const horasTranscurridas = Math.floor(minutosTranscurridos / 60);
  const diasTranscurridos = Math.floor(horasTranscurridas / 24);
  const semanasTranscurridas = Math.floor(diasTranscurridos / 7);
  const mesesTranscurridos = Math.floor(semanasTranscurridas / 4.345);

  if (mesesTranscurridos > 0) {
    return `${mesesTranscurridos} mes${mesesTranscurridos > 1 ? "es" : ""} `;
  } else if (semanasTranscurridas > 0) {
    return `${semanasTranscurridas} semana${
      semanasTranscurridas > 1 ? "s" : ""
    } `;
  } else if (diasTranscurridos > 0) {
    return `${diasTranscurridos} día${diasTranscurridos > 1 ? "s" : ""} `;
  } else if (horasTranscurridas > 0) {
    return `${horasTranscurridas} hora${horasTranscurridas > 1 ? "s" : ""} `;
  } else if (minutosTranscurridos > 0) {
    return `${minutosTranscurridos} minuto${
      minutosTranscurridos > 1 ? "s" : ""
    } `;
  } else {
    return "Hace menos de un minuto";
  }
}
