const apiKey = "65f192b8f114321f67573326a04f85e6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");


async function checkWeather(cityName){
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{

        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // update the background images
        if(data.weather[0].main == "Clouds"){
            weather_icon.src = "/assests/clouds.png";
        }else if(data.weather[0].main == "Clear"){
            weather_icon.src = "/assests/clear.png";
        }else if(data.weather[0].main == "Rain"){
            weather_icon.src = "/assests/rain.png";
        }else if(data.weather[0].main == "Drizzle"){
            weather_icon.src = "/assests/drizzle.png";
        }else if(data.weather[0].main == "Mist"){
            weather_icon.src = "/assests/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchButton.addEventListener("click", ()=>{
    const cityNameValue = searchBox.value;
    checkWeather(cityNameValue);
})