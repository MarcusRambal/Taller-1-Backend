//https://rickandmortyapi.com/api/character?pages=${}

const fetchData = async (page) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    const info = await response.json()
    return info.results
}


export const resultadoDeApi = async () => {

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
                const  page = i + j
                peticiones.push(fetchData(page))
            }
            
            const resultados = await Promise.all(peticiones)

            // Cada bloque lo agregamos al arreglo de personajes, y si no es el último bloque, esperamos 2 segundos antes de hacer el siguiente bloque de peticiones
            resultados.forEach(resultado => {
                personajes.push(...resultado)
            })

            if(i + blocks <= numPag) {
                // console.log('Esperando 1 segundos antes del siguiente bloque')
                await delay(1000)
            }
        }

         // console.log(personajes)
         return personajes
}


//const todaslaspaginas = await resultadoDeApi()
//console.log(todaslaspaginas)

