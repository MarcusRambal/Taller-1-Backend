import { normalizarDatos } from './normalizacion.js';
import { ejecutarConsultas } from './consultas.js';

console.log('Obteniendo y normalizando personajes...');
const personajesNormalizados = await normalizarDatos();

console.log('Ejecutando consultas...');
const resultados = ejecutarConsultas(personajesNormalizados);

console.log('--- RESULTADOS ---');
console.log(resultados);