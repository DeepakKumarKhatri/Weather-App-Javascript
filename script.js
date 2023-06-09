const apiKey = "65f192b8f114321f67573326a04f85e6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");


async function checkWeather(cityName){
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    
    if(searchBox.value !== ""){
        if(response.status == 404){
            document.querySelector(".city-error").style.display = "block";
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
                document.querySelector(".card").style.background = "linear-gradient(135deg, #B2BDCD, #485461)";

            }else if(data.weather[0].main == "Clear"){
                weather_icon.src = "/assests/clear.png";
                document.querySelector(".card").style.background = "linear-gradient(135deg, #00feba, #5b548a)";

            }else if(data.weather[0].main == "Rain"){
                weather_icon.src = "/assests/rain.png";
                document.querySelector(".card").style.background = "linear-gradient(135deg, #76b852, #8DC26F)";

            }else if(data.weather[0].main == "Drizzle"){
                weather_icon.src = "/assests/drizzle.png";
                document.querySelector(".card").style.background = "linear-gradient(135deg, #7F7FD5, #86A8E7, #91EAE4)";
            
            }else if(data.weather[0].main == "Mist"){
                weather_icon.src = "/assests/mist.png";
                document.querySelector(".card").style.background = "linear-gradient(135deg, #DAD299, #B0DAB9)";
            }
    
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".city-error").style.display = "none";
        }
    }else{
        document.querySelector(".empty-string-error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".city-error").style.display = "none";
    }
}

searchBox.addEventListener("click", function () {
    if (window.getSelection().toString() === "") {
        // Select text if it is not already selected
        this.select();
    }
});
  
searchBox.addEventListener("dblclick", function () {
    if (window.getSelection().toString() !== "") {
        // Clear text selection if it is already selected
        window.getSelection().empty();
    }
});


searchBox.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        searchButton.click();
    }
});

searchButton.addEventListener("click", ()=>{
    const cityNameValue = searchBox.value;
    checkWeather(cityNameValue);
})