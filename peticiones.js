//https://rickandmortyapi.com/api/character?pages=${}

const resultadoDeApi = async () => {

    const respuesta = await fetch("https://rickandmortyapi.com/api/character")
    const infoApi = await respuesta.json()
    const numPag = infoApi.info.pages

    // console.log(numPag)

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const blocks = 5    
    const personajes = []

        for (let i = 1; i <= numPag; i += blocks) {
            const peticiones = []

            for (let j = 0; j < blocks && i + j <= numPag; j++) {
                 // console.log('Haciendo peticion a la pagina ${i + j}')
                peticiones.push(fetch(`https://rickandmortyapi.com/api/character?page=${i + j}`)
                .then(respuesta => respuesta.json()))
            }
            
            const resultados = await Promise.all(peticiones)

            resultados.forEach(resultado => {
                personajes.push(...resultado.results)
            })

            if(i + blocks <= numPag) {
                // console.log('Esperando 2 segundos antes del siguiente bloque')
                await delay(2000)
            }
        }

         // console.log(personajes)
         return personajes
}


const todaslaspaginas = await resultadoDeApi()
// console.log(todaslaspaginas)