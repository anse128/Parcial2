const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const apiType = "https://pokeapi.co/api/v2/type/";
const apiAbility = "https://pokeapi.co/api/v2/ability/";
const apiSpecies = "https://pokeapi.co/api/v2/pokemon-species/"

async function consultarApiPokemon(url) {
    try {
        const response = await axios.get(url);
        return response.data; // Devolvemos solo los datos de la respuesta
    } catch (error) {
        console.error(`Fallo la consulta a la API: ${error}`);
        throw new Error("No se pudo obtener los datos del Pokémon.");
    }
}

async function obtenerDatosPokemon(url) {
    try {
        const datos = await consultarApiPokemon(url);

        const containerInfo = document.querySelector(".containerInfo");
        containerInfo.style.display = "block";

        const nombrePokemonElemento = document.querySelector(".pokemonName");
        nombrePokemonElemento.innerHTML = datos.name;

        const imagenPokemonElemento = document.querySelector(".pokemonImg");
        imagenPokemonElemento.src = datos.sprites.other.home.front_default;

        const tipoPokemonElemento = document.querySelector(".pokemonType");
        tipoPokemonElemento.innerHTML = datos.types[0].type.name;

        for (let i = 0; i < datos.types.length; i++) {
            const urlType = `${apiType}${datos.types[i].type.name}`;
            await type(urlType);
        }

        const abilidadesPokemonElemento = document.querySelector(".pokemonAbilities");
        const habilidades = datos.abilities.map(ability => ability.ability.name);
        console.log(habilidades)

        for (let i = 0; i < datos.abilities.length; i++) {
            const urlHabilidad = `${apiAbility}${datos.abilities[i].ability.name}`;
            await ability(urlHabilidad);
        }

        obtenerDatosPokemonEvolucion(`${apiSpecies}${datos.name}`)

        // Ocultar el contenedor de error si se muestra
        const contError = document.querySelector(".containerError");
        contError.style.display = "none";

    } catch (error) {
        console.error(`Error al obtener datos del Pokémon: ${error.message}`);

        // Mostrar el contenedor de error y ocultar el contenedor de información
        const contError = document.querySelector(".containerError");
        contError.style.display = "block";

        const containerInfo = document.querySelector(".containerInfo");
        containerInfo.style.display = "none";
    }
}


async function obtenerDatosPokemonEvolucion(url) {

    const datos = await consultarApiPokemon(url);

    const urlEvolucion1 = datos.evolution_chain.url;

    const descripcionPokemonElemento = document.querySelector(".pokemonDescrition");
    descripcionPokemonElemento.innerHTML = datos.flavor_text_entries[26].flavor_text;

    const evolutionUrl = `${urlEvolucion1}`;

    // console.log(evolutionUrl)
    obtenerDatosPokemonEvolucion1(evolutionUrl)

}
let evolutionName = '';
let evolutionName2 = '';
console.log(evolutionName)

async function obtenerDatosPokemonEvolucion1(url) {

    const datos = await consultarApiPokemon(url);

    evolutionName2 = datos?.chain?.evolves_to[0]?.species.name;
    evolutionName = datos?.chain?.evolves_to[0].evolves_to[0].species.name;
    // console.log(evolutionName2)

    const evolutionUrl = datos?.chain?.evolves_to[0].evolves_to[0].species.url;

    const nombrePokemonElemento = document.querySelector(".pokemonName");

    if (evolutionName != nombrePokemonElemento.textContent) {
        if (evolutionName2 == nombrePokemonElemento.textContent)
            evolutionName2 = ''
        const contError = document.querySelector(".containerEvolution");
        contError.style.display = "block";
    }
    else {
        const contError = document.querySelector(".containerEvolution");
        contError.style.display = "none";
    }


    // obtenerDatosPokemonEvolucion2(evolutionUrl)
}


// function actualizarInterfaz(datos) {

// }
async function type(url) {

    const datos = await consultarApiPokemon(url);
    console.log('""""""""""""""')
    const tipoPokemonElemento = document.querySelector(".pokemonType");
    console.log(datos.names[5].name)
    tipoPokemonElemento.innerHTML = datos.names[5].name;

}
async function ability(url) {

    const datos = await consultarApiPokemon(url);

    const habilidadPokemonElemento = document.querySelector(".pokemonAbilities");
    console.log(datos.names[5].name)
    habilidadPokemonElemento.innerHTML = datos.names[5].name;

}


const searchButton = document.querySelector(".buttonSearch");
const searchInput = document.querySelector("input");

searchButton.addEventListener("click", () => {
    const nombrePokemon = searchInput.value
    const url = `${apiUrl}${nombrePokemon}`;
    obtenerDatosPokemon(url);
    // console.log(url)

});

const evolutionButton = document.querySelector(".buttonEvolution");

evolutionButton.addEventListener("click", () => {
    let url = '';
    if (evolutionName2) {
        url = `${apiUrl}${evolutionName2}`;
        evolutionName2 = '';
    }
    else
        url = `${apiUrl}${evolutionName}`;

    obtenerDatosPokemon(url);


});
















// const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
// const evolutionUrl = "https://pokeapi.co/api/v2/evolution-chain/";

// async function consultarApi(url) {
//     try {
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.error(`Fallo la consulta a la API: ${error}`);
//         throw new Error("No se pudo obtener los datos.");
//     }
// }

// async function obtenerDatosPokemon(url) {
//     try {
//         const datos = await consultarApi(url);
//         actualizarInterfaz(datos);
//         const evolutionUrl = datos.species.url;
//         obtenerDatosPokemonEvolucion(evolutionUrl);
//     } catch (error) {
//         mostrarError(error.message);
//     }
// }

// async function obtenerDatosPokemonEvolucion(url) {
//     try {
//         const datos = await consultarApi(url);
//         actualizarInterfazEvolucion(datos);
//     } catch (error) {
//         mostrarError(error.message);
//     }
// }

// function actualizarInterfaz(datos) {
//     const containerInfo = document.querySelector(".containerInfo");
//     containerInfo.style.display = "block";

//     const nombrePokemonElemento = document.querySelector(".pokemonName");
//     nombrePokemonElemento.innerHTML = datos.name;

//     const imagenPokemonElemento = document.querySelector(".pokemonImg");
//     imagenPokemonElemento.src = datos.sprites.other.home.front_default;

//     const tipoPokemonElemento = document.querySelector(".pokemonType");
//     tipoPokemonElemento.innerHTML = datos.types[0].type.name;

//     const abilidadesPokemonElemento = document.querySelector(".pokemonAbilities");
//     const habilidades = datos.abilities.map(ability => ability.ability.name);
//     abilidadesPokemonElemento.textContent = habilidades.join(", ");

//     // Ocultar el contenedor de error si se muestra
//     const contError = document.querySelector(".containerError");
//     contError.style.display = "none";
// }

// function actualizarInterfazEvolucion(datos) {
//     const descripcionPokemonElemento = document.querySelector(".pokemonDescrition");
//     descripcionPokemonElemento.innerHTML = datos.flavor_text_entries[26].flavor_text;

//     // Aquí puedes agregar más lógica para mostrar la información de la evolución
// }

// function mostrarError(mensaje) {
//     console.error(`Error: ${mensaje}`);

//     // Mostrar el contenedor de error y ocultar el contenedor de información
//     const contError = document.querySelector(".containerError");
//     contError.style.display = "block";

//     const containerInfo = document.querySelector(".containerInfo");
//     containerInfo.style.display = "none";
// }

// const searchButton = document.querySelector(".buttonSearch");
// const searchInput = document.querySelector("input");

// searchButton.addEventListener("click", () => {
//     const nombrePokemon = searchInput.value;
//     const url = `${apiUrl}${nombrePokemon}`;
//     obtenerDatosPokemon(url);
// });

// const evolutionButton = document.querySelector(".buttonEvolution");

// evolutionButton.addEventListener("click", () => {
//     const url = evolutionUrl; // Ajusta esto según tu lógica
//     obtenerDatosPokemonEvolucion(url);
// });
