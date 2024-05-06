const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const apiType = "https://pokeapi.co/api/v2/type/";
const apiAbility = "https://pokeapi.co/api/v2/ability/";
const apiEvolutionChane = "https://pokeapi.co/api/v2/pokemon-species/"


const consultarApiPokemon = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data; // Devolvemos solo los datos de la respuesta
    } catch (error) {
        console.error(`Fallo la consulta a la API: ${error}`);
        throw new Error("No se pudo obtener los datos del Pokémon.");
    }
}

const obtenerDatosPokemon = async (url) => {
    try {
        const datos = await consultarApiPokemon(url);

        const containerInfo = document.querySelector(".containerInfo");
        containerInfo.style.display = "block";

        //Nombre
        const nombrePokemonElemento = document.querySelector(".pokemonName");
        nombrePokemonElemento.innerHTML = datos.name;

        //Imagen
        const imagenPokemonElemento = document.querySelector(".pokemonImg");
        imagenPokemonElemento.src = datos.sprites.other.home.front_default;

        //Descripción
        const descripcionPokemonElemento = document.querySelector(".pokemonDescription");
        let arrayDescriptionEvolution = await obtenerDescripcionUrlEvolution(`${apiEvolutionChane}${datos.name}`)
        descripcionPokemonElemento.innerHTML = arrayDescriptionEvolution[0]

        //Evolution
        evolutionUrl = arrayDescriptionEvolution[1]
        obtenerDatosEvolucion(evolutionUrl)


        //Tipo
        const tipoPokemonElemento = document.querySelector(".pokemonType");

        let type = [];

        for (let i = 0; i < datos.types.length; i++) {
            const urlType = `${apiType}${datos.types[i].type.name}`;
            type.push(await updateTypeAbilty(urlType))
            tipoPokemonElemento.innerHTML = type
        }

        //Habilidades
        const habilidadesPokemonElemento = document.querySelector(".pokemonAbilities");

        let ability = [];

        for (let i = 0; i < datos.abilities.length; i++) {
            const urlHabilidad = `${apiAbility}${datos.abilities[i].ability.name}`;
            ability.push(await updateTypeAbilty(urlHabilidad));
            habilidadesPokemonElemento.innerHTML = ability;
        }
        // Ocultar el contenedor de error si se muestra
        const contError = document.querySelector(".containerError");
        contError.style.display = "none";
    } catch (error) {
        mostrarError(error)
    }
}

const obtenerDescripcionUrlEvolution = async (url) => {

    try {

        const datos = await consultarApiPokemon(url);
        const urlEvolucion1 = datos.evolution_chain.url;

        let index = datos.flavor_text_entries.findIndex((element) => element.language.name == "es")

        const evolutionUrl = `${urlEvolucion1}`;
        const description = datos.flavor_text_entries[index].flavor_text
        let array = [description, evolutionUrl]
        return array

    } catch (error) {
        console.error(error);
    }
}

const updateTypeAbilty = async (url) => {
    try {
        const datos = await consultarApiPokemon(url);
        return datos.names[5].name
    } catch (error) {
        console.error(error);
    }
}


const mostrarError = (mensaje) => {
    console.error(`Error al obtener datos del Pokémon: ${mensaje.message}`);

    // Mostrar el contenedor de error y ocultar el contenedor de información
    const contError = document.querySelector(".containerError");
    contError.style.display = "block";

    const containerInfo = document.querySelector(".containerInfo");
    containerInfo.style.display = "none";
}

let evolutionName = '';
let evolutionName2 = '';


async function obtenerDatosEvolucion(url) {

    const datos = await consultarApiPokemon(url);

    evolutionName2 = datos?.chain?.evolves_to[0]?.species.name;
    evolutionName = datos?.chain?.evolves_to[0].evolves_to[0].species.name;
    
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
