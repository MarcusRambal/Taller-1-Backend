import { resultadoDeApi } from './peticiones.js';

export const normalizarDatos = async () => {
  // Obtenemos todos los personajes usando la función de peticiones
  const personajesCrudos = await resultadoDeApi();

  // Transformamos los datos con map siguiendo la estructura solicitada
  const personajesNormalizados = personajesCrudos.map((personaje) => {
    return {
      id: personaje.id,
      nombre: personaje.name,
      estado: personaje.status,
      especie: personaje.species,
      tipo: personaje.type,
      genero: personaje.gender,
      origen: personaje.origin.name,          // Extraemos solo el nombre del objeto origin
      ubicacionActual: personaje.location.name, // Extraemos solo el nombre del objeto location
      cantidadEpisodios: personaje.episode.length, // Contamos la cantidad de URLs en el array episode
      imagen: personaje.image
    };
  });

  return personajesNormalizados;
};

// Prueba rápida para verificar por consola
//const datosNormalizados = await normalizarDatos();
//console.log(datosNormalizados);
