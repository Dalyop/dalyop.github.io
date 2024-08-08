const API_KEY = "120a8f349fdda1224939b03619966397";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
  
// search_button.addEventListener("click", async () => {
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${search_input.value}&appid=${API_KEY}`
//       );
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching from the weather api", error);
//     }
//   });

  async function checkWeather(city){
    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

        console.log(data)
        document.querySelector(".card").style.display = "flex";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "https://i.postimg.cc/W1KyTM5M/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "https://i.postimg.cc/6QRxS9dL/clear.png";
        }
        else if(data.weather[0] == "Rain"){
            weatherIcon.src = "https://i.postimg.cc/ZnFndXXc/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "https://i.postimg.cc/zv5mgzLP/drizzle.png";
        }
        else if(data.weather[0] == "Mist"){
            weatherIcon.src = "https://i.postimg.cc/Qx2QkFNt/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        }
            
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    })



// Check if the browser supports geolocation










































