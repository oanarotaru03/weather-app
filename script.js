const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

async function getWeather() {
    const city = cityInput.value;

    if (city === "") {
        return;
    }

    result.textContent = "Loading...";

    const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + city;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results) {
        result.textContent = "City not found. Try again.";
        return;
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const cityName = geoData.results[0].name;

    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current_weather=true";
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const temp = weatherData.current_weather.temperature;

   const today = new Date();
const dateString = today.toLocaleDateString();
result.textContent = `${cityName}: ${temp}°C (as of ${dateString})`;

}

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});