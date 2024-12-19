const apiKey = "d015391bbfb17bdf52dd9e7b45dbfea7"; // Replace with your OpenWeatherMap API key

document.getElementById("getWeather").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getWeather, 
            showError, 
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

function getWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not available");
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const city = data.name;
            document.getElementById("temperature").innerText = 
                `The current temperature in ${city} is ${temperature}°C.`;
        })
        .catch(error => {
            console.error(error);
            document.getElementById("temperature").innerText = 
                "Could not fetch weather data. Please try again.";
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
            break;
    }
}
