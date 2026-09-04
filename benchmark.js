//https://rickandmortyapi.com/api/character?pages=${}
/*Estrategia 1 – Consultas secuenciales
Consultar las páginas utilizando await dentro de un ciclo, realizando una petición
después de finalizar la anterior.
Registrar el tiempo de ejecución.
*/

const consultasSecuenciales = async () => {
    const inicio = performance.now()

    const respuesta = await fetch("https://rickandmortyapi.com/api/character")
    const infoApi = await respuesta.json()
    const numPag = infoApi.info.pages

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    const personajes = []

    for (let i = 1; i <= numPag; i++) {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
        const infoApi = await respuesta.json()
        // console.log(`pagina: ${i} con ${infoApi.results.length} personajes` )

        personajes.push(...infoApi.results)
        //Con 300 ms de delay, la API no me bloquea, con 200ms bloquea con 250ms tambien bloquea,
        //Estoy haciendo aprox 4 peticiones por segundo, en teoria si son 4 peticiones cada 1.2 segundos.
        //Me estaria demorando teoricamente 12.6 seg en total para traer todos los datos. 
        await delay(300)
    }
    const fin = performance.now()
    const tiempoTotal = fin - inicio

    return {
        estrategia: "Consultas secuenciales",
        personajes: personajes.length,
        tiempoTotal: (tiempoTotal/1000).toFixed(2) + " segundos"
    }
}

//Decomentar las siguientes lineas para ejecutar la estrategia de consultas secuenciales
//const totalResultados = await consultasSecuenciales()
//console.log(totalResultados)

/*
Estrategia 2 – Consultas concurrentes
Consultar todas las páginas utilizando Promise.all().
Registrar el tiempo de ejecución.
La solución definitiva del taller deberá utilizar esta estrategia.

*/
const consultasConcurrentes = async () => {
    const inicio = performance.now()

    const respuesta = await fetch("https://rickandmortyapi.com/api/character")
    const infoApi = await respuesta.json()
    const numPag = infoApi.info.pages

    // console.log(numPag)

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const blocks = 3    
    
    //Personajes contendra todos lo que se obtenga de la API en la parte de results, y se retornara al final de la funcion
    const personajes = []

        // El primer for representa el primer valor del siguiente bloque de peticiones, y el segundo for representa cada una de las peticiones dentro del bloque
        // Es decir el primer ciclo i es 1, pasado el bloque de 5, el siguiente ciclo i es 6 y así sucesivamente, mientras que el segundo ciclo j representa cada una  
        // de las peticiones dentro del bloque, es decir 1,2,3,4,5 y así sucesivamente
        for (let i = 1; i <= numPag; i += blocks) {
            const peticiones = []

            for (let j = 0; j < blocks && i + j <= numPag; j++) {
                 // console.log('Haciendo peticion a la pagina ${i + j}')
                peticiones.push(fetch(`https://rickandmortyapi.com/api/character?page=${i + j}`)
                .then(respuesta => respuesta.json()))
            }
            
            const resultados = await Promise.all(peticiones)
            // console.log(`Bloque de peticiones de la pagina ${i} a la pagina ${i + blocks - 1} completado`)

            // Cada bloque lo agregamos al arreglo de personajes, y si no es el último bloque, esperamos 2 segundos antes de hacer el siguiente bloque de peticiones
            resultados.forEach(resultado => {
                personajes.push(...resultado.results)
            })

            if(i + blocks <= numPag) {
                // Con 800 ms de delay, la API no me bloquea, con 700ms bloquea con 750ms tambien bloquea,
                // Estoy haciendo aprox 3 peticiones por bloque, en teoria si son 3 peticiones cada 1.8 segundos.
                //console.log('Esperando 800 ms antes del siguiente bloque')
                await delay(1000)
            }
        }
        const fin = performance.now()
        const tiempoTotal = fin - inicio
         // console.log(personajes)
         return {
            estrategia: "Consultas concurrentes",
            personajes: personajes.length,
            tiempoTotal: (tiempoTotal/1000).toFixed(2) + " segundos"
         }
}

// Decomentar las siguientes lineas para ejecutar la estrategia de consultas concurrentes
//const todaslaspaginas = await consultasConcurrentes()
//console.log(todaslaspaginas)
