//variables cotaining html element using query selector to get the class name
var button = document.querySelector('.searchButton');
var inputValue = document.querySelector('.inputValue');
var city = document.querySelector(".name");
var country = document.querySelector(".country");
var description = document.querySelector(".desc");
var temperature = document.querySelector(".temp");
var humidity = document.querySelector(".humid");
var notification = document.querySelector(".notification");

/*This checks for service workers support in the browser and then implements the necessary instruction */
if('serviceWorker' in navigator){
	window.addEventListener('load', () => {
		navigator.serviceWorker
		.register('../sw_cached_site.js')
		.then(reg => console.log('Service worker is properly registered'))
		.catch(err => console.log('Service worker is having a little bit of an issue: ${err}'));
	})
};

//Open weather api key
const api = "120a8f349fdda1224939b03619966397";

//kevin to celcius
const kelvin = 273;

//Initializing an empty object for weather data information when the user searches for a city
const weather = {};

weather.temperature = {
	
}

//Initializing an empty object for weather data information when the user allows geolocation
const geoWeather = {};

geoWeather.temperature = {
	
}
//Event listener that listens for a click when the user hits the search button
button.addEventListener('click', function(){
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+inputValue.value+`&appid=${api}`)
	.then(response => response.json())
	.then(function(data){
		if((Storage) !== undefined){
			localStorage.setItem("weatherData", JSON.stringify(data));
			var hData = JSON.parse(localStorage.getItem("weatherData"));
				weather.iconId = hData.weather[0].icon;
				weather.city = hData.name;
				weather.country = hData.sys.country;
				weather.description = hData.weather[0].description;
				weather.temperature.celcius = Math.floor(hData.main.temp - kelvin);
				weather.temperature.fahrenheit = Math.floor((hData.main.temp - kelvin)  * 9/5 + 32);
			
		}else{
			
		}
		
		
		/*if(typeof(sData) == 'string'){
				var hData = JSON.parse(sData);
				console.log(hData);
					
			
			}else{
				console.log("nawa oh");
			}*/
		//weather.iconId = data.weather[0].icon;
		//weather.city = data.name;
		//weather.country = data.sys.country;
		//weather.description = data.weather[0].description;
		//weather.temperature.celcius = Math.floor(data.main.temp - kelvin);
		//weather.temperature.fahrenheit = Math.floor((data.main.temp - kelvin)  * 9/5 + 32);
	})
	.then(function(){
		
		
		displayWeather();
	})
});

//Displays the weather information to the user when they use the search box
function displayWeather(){
	document.querySelector('.iconImage').innerHTML = `<img src="icons/${weather.iconId}.png"  style="width:100%"/>`;
	document.querySelector('.sName').innerHTML = weather.city;
	document.querySelector('.sCountry').innerHTML = weather.country;
	document.querySelector('.sDesc').innerHTML = weather.description;
	document.querySelector('.sTemp-front').innerHTML = `${weather.temperature.celcius}<span>°C</span>`;
	document.querySelector('.sTemp-back').innerHTML = `${weather.temperature.fahrenheit}<span>F</span>`;
};



//Geolocation api - check for browser support
if ('geolocation' in navigator){
	navigator.geolocation.getCurrentPosition(setPosition, showError);
	}else{
	//Code for unsupported browsers
};


//Set users position using the setPosition function
function setPosition(position){
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	
	getWeather(latitude, longitude);
};


//Set the showError function
function showError(error){
	notification.innerHTML = `<span style="display:block";>${error.message}</span>`;
};


//Set the getWeather function
function getWeather(latitude, longitude){
	let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`;
	
	fetch(weatherApi)
		.then(response => response.json())
		.then(function(data){
			geoWeather.iconId = data.weather[0].icon;
			geoWeather.city = data.name;
			geoWeather.country = data.sys.country;
			geoWeather.description = data.weather[0].description;
			geoWeather.temperature.celcius = Math.floor(data.main.temp - kelvin);
			geoWeather.temperature.fahrenheit = Math.floor((data.main.temp - kelvin) * 9/5 + 32);
		})
		.then(function(){
			displayGeoWeather();
		})
	};

function displayGeoWeather(){
		document.querySelector('.iconImages').innerHTML = `<img src="icons/${geoWeather.iconId}.png" width="60px;"/>`;
		document.querySelector('.city').innerHTML = geoWeather.city;
		document.querySelector('.country').innerHTML = geoWeather.country;
		document.querySelector('.desc').innerHTML = geoWeather.description;
		document.querySelector('.temp-front').innerHTML = `${geoWeather.temperature.celcius}°<span>C</span>`;
		document.querySelector('.temp-back').innerHTML = `${geoWeather.temperature.fahrenheit}<span>F</span>`;
};
