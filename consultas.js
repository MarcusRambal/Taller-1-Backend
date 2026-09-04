// consultas.js

// ⚠️ Asegúrate de incluir la palabra "export" aquí al inicio
export const ejecutarConsultas = (personajes) => {
    // 1. Vivos y de especie Human
    const humanosVivos = personajes.filter(p => p.estado === 'Alive' && p.especie === 'Human');

    // 2. 20 o más episodios
    const mas20Episodios = personajes.filter(p => p.cantidadEpisodios >= 20);

    // 3. Primer personaje Alien y Female
    const primeraAlienHembra = personajes.find(p => p.especie === 'Alien' && p.genero === 'Female');

    // 4. Si existe al menos un personaje cuyo campo 'tipo' tenga información
    const tieneTipo = personajes.some(p => p.tipo && p.tipo.trim() !== '');

    // 5. Verificar que todos tengan imagen y al menos 1 episodio
    const todosValidos = personajes.every(p => p.imagen && p.cantidadEpisodios >= 1);

    // 6. Agrupar por especie
    const porEspecie = personajes.reduce((acc, p) => {
        if (!acc[p.especie]) {
            acc[p.especie] = { cantidad: 0, totalEpisodios: 0, vivos: 0 };
        }
        acc[p.especie].cantidad += 1;
        acc[p.especie].totalEpisodios += p.cantidadEpisodios;
        if (p.estado === 'Alive') acc[p.especie].vivos += 1;
        return acc;
    }, {});

    Object.keys(porEspecie).forEach(esp => {
        const data = porEspecie[esp];
        data.promedioEpisodios = Number((data.totalEpisodios / data.cantidad).toFixed(1));
        delete data.totalEpisodios;
    });

    // 7. Clasificar por episodios
    const clasificacionEpisodios = personajes.reduce((acc, p) => {
        const eps = p.cantidadEpisodios;
        if (eps <= 5) acc['1-5'] += 1;
        else if (eps <= 15) acc['6-15'] += 1;
        else if (eps <= 30) acc['16-30'] += 1;
        else acc['30+'] += 1;
        return acc;
    }, { '1-5': 0, '6-15': 0, '16-30': 0, '30+': 0 });

    return {
        humanosVivos,
        mas20Episodios,
        primeraAlienHembra,
        tieneTipo,
        todosValidos,
        porEspecie,
        clasificacionEpisodios
    };
};