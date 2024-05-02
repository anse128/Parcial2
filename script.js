// https://pokeapi.co/api/v2/pokemon/pikachu

// https://pokeapi.co/api/v2/pokemon-species/{numero}

// https://pokeapi.co/api/v2/evolution-chain/{numero}

// Vaya! algo salió mal.
// Es posible que el nombre de tu pokemón este mal escrito.
// Por favor revisar e intenta nuevamente.

const apiUrl =
  "https://pokeapi.co/api/v2/pokemon/";
//const apiKey = "&appid=d3c39f57206d5904890771c822ffaac3";

async function consultarApiClima(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`fallo la consulta a la api: ${error}`);
    const contError = document.querySelector(".error");
    const contWeather = document.querySelector(".weather");
    contError.style.display = "block";
    contWeather.style.display = "none";
  }
}

async function obtenerDatosClima(url) {
  const datos = await consultarApiClima(url);
  let nombreCiudad = document.querySelector(".city");
  nombreCiudad.innerHTML = datos.name;
  let temperatura = document.querySelector(".temp");
  temperatura.innerHTML = datos.main.temp + "°C";
  let humedad = document.querySelector(".humidity");
  humedad.innerHTML = datos.main.humidity + "%";
  let viento = document.querySelector(".wind");
  viento.innerHTML = datos.wind.speed + "km/h";
  let iconoClima = document.querySelector(".weather-icon");
  const estadoClima = datos.weather[0].main;
  iconoClima.src = "images/" + String(estadoClima).toLowerCase() + ".png";

  const contError = document.querySelector(".error");
  const contWeather = document.querySelector(".weather");
  contError.style.display = "none";
  contWeather.style.display = "block";
}

const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");

searchButton.addEventListener("click", () => {
  const nombrePokemon = searchInput.value;
  console.log(nombrePokemon);
  const url = `${apiUrl}${nombrePokemon}`;
  console.log(url);
  obtenerDatosClima(url);
});
