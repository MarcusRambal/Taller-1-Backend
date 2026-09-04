// peticiones.js

export const resultadoDeApi = async () => {
    // 1. Obtener el número total de páginas
    const respuesta = await fetch("https://rickandmortyapi.com/api/character");
    
    if (!respuesta.ok) {
        throw new Error(`Error en la petición inicial: ${respuesta.status}`);
    }
    
    const infoApi = await respuesta.json();
    const numPag = infoApi.info.pages;

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    // Configuración probada en el benchmark
    const blocks = 3; 
    const personajes = [];

    // 2. Iterar por bloques de 3 peticiones
    for (let i = 1; i <= numPag; i += blocks) {
        const peticiones = [];

        for (let j = 0; j < blocks && (i + j) <= numPag; j++) {
            const paginaActual = i + j;
            peticiones.push(
                fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
                    .then(res => res.json())
            );
        }

        const resultados = await Promise.all(peticiones);

        resultados.forEach(resultado => {
            if (resultado && resultado.results) {
                personajes.push(...resultado.results);
            }
        });

        // Esperar 1 segundo antes del siguiente bloque si no es el último
        if (i + blocks <= numPag) {
            await delay(1000);
        }
    }

    return personajes;
};