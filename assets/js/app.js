//variables cotaining html element using query selector to get the class name
var button = document.querySelector('.searchButton');
var inputValue = document.querySelector('.inputValue');
var city = document.querySelector(".city");
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
			//What should go here?? hmm!
		}
	})
	.then(function(){
		displayWeather();
	})
});

//Displays the weather information to the user when they use the search box
function displayWeather(){
		document.querySelector('.iconImages').innerHTML = `<img src="assets/img/icons/${weather.iconId}.png"  style="width:27px"/>`;
		document.querySelector('.city').innerHTML = weather.city;
		document.querySelector('.country').innerHTML = weather.country;
		document.querySelector('.desc').innerHTML = weather.description;
		document.querySelector('.temp-front').innerHTML = `${weather.temperature.celcius}<span>°C</span>`;
		document.querySelector('.temp-back').innerHTML = `${weather.temperature.fahrenheit}<span>F</span>`;
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
	fiveDaysForecast(latitude, longitude)
	dailyForecast(latitude, longitude);
};


//Set the showError function
function showError(error){
	//notification.innerHTML = `<span style="display:block";>${error.message}</span>`;
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
			//displayGeoWeather();
		})
	};

function displayGeoWeather(){
			document.querySelector('.iconImages').innerHTML = `<img src="icons/${geoWeather.iconId}.png" width="27px;"/>`;
			document.querySelector('.city').innerHTML = geoWeather.city;
			document.querySelector('.country').innerHTML = geoWeather.country;
			document.querySelector('.desc').innerHTML = geoWeather.description;
			document.querySelector('.temp-front').innerHTML = `${geoWeather.temperature.celcius}°<span>C</span>`;
			document.querySelector('.temp-back').innerHTML = `${geoWeather.temperature.fahrenheit}<span>F</span>`;
};

var geoFiveDay = {};
geoFiveDay.temperature = {

}

function fiveDaysForecast(latitude, longitude){
	let fiveDayForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api}`;

	fetch(fiveDayForecastApi)
		.then(response => response.json())
		.then(function(data){
			geoFiveDay.city = data.city.name;
			geoFiveDay.country = data.city.country;
			geoFiveDay.date = data.list[0].dt_txt;
			geoFiveDay.temperature.celcius = data.list[0].main.temp;
			geoFiveDay.description = data.list[0].weather[0].description;
			geoFiveDay.iconId = data.list[0].weather[0].icon;

			//Five day weather forecas day 2
			geoFiveDay.city2 = data.city.name;
			geoFiveDay.country2 = data.city.country;
			geoFiveDay.date2 = data.list[1].dt_txt;
			geoFiveDay.temperature.celcius2 = data.list[1].main.temp;
			geoFiveDay.description2 = data.list[1].weather[0].description;
			geoFiveDay.iconId2 = data.list[1].weather[0].icon;

			//Five day weather forecas day 3
			geoFiveDay.city3 = data.city.name;
			geoFiveDay.country3 = data.city.country;
			geoFiveDay.date3 = data.list[2].dt_txt;
			geoFiveDay.temperature.celcius3 = data.list[2].main.temp;
			geoFiveDay.description3 = data.list[2].weather[0].description;
			geoFiveDay.iconId3 = data.list[2].weather[0].icon;

			//Five day weather forecas day 4
			geoFiveDay.city4 = data.city.name;
			geoFiveDay.country4 = data.city.country;
			geoFiveDay.date4 = data.list[3].dt_txt;
			geoFiveDay.temperature.celcius4 = data.list[3].main.temp;
			geoFiveDay.description4 = data.list[3].weather[0].description;
			geoFiveDay.iconId4 = data.list[3].weather[0].icon;

		})
		.then(function(){
			displayFiveDay()
		})
}
//Five day display function
function displayFiveDay(){
			document.querySelector('.fiveIcon1').innerHTML = `<img src="assets/img/icons/${geoFiveDay.iconId}.png" width="50px;"/>`;
			document.querySelector('.fiveDate1').innerHTML = geoFiveDay.date;
			document.querySelector('.fiveCity1').innerHTML = geoFiveDay.city;
			document.querySelector('.fiveCountry1').innerHTML = geoFiveDay.country;
			document.querySelector('.fiveTemp1').innerHTML = geoFiveDay.temperature.celcius;
			document.querySelector('.fiveDesc1').innerHTML = geoFiveDay.description;

			//Display for day 2
			document.querySelector('.fiveIcon2').innerHTML = `<img src="assets/img/icons/${geoFiveDay.iconId2}.png" width="50px;"/>`;
			document.querySelector('.fiveDate2').innerHTML = geoFiveDay.date2;
			document.querySelector('.fiveCity2').innerHTML = geoFiveDay.city2;
			document.querySelector('.fiveCountry2').innerHTML = geoFiveDay.country2;
			document.querySelector('.fiveTemp2').innerHTML = geoFiveDay.temperature.celcius2;
			document.querySelector('.fiveDesc2').innerHTML = geoFiveDay.description2;

			//Display for day 3
			document.querySelector('.fiveIcon3').innerHTML = `<img src="assets/img/icons/${geoFiveDay.iconId3}.png" width="50px;"/>`;
			document.querySelector('.fiveDate3').innerHTML = geoFiveDay.date3;
			document.querySelector('.fiveCity3').innerHTML = geoFiveDay.city3;
			document.querySelector('.fiveCountry3').innerHTML = geoFiveDay.country3;
			document.querySelector('.fiveTemp3').innerHTML = geoFiveDay.temperature.celcius3;
			document.querySelector('.fiveDesc3').innerHTML = geoFiveDay.description3;

			//Display for day 4
			document.querySelector('.fiveIcon4').innerHTML = `<img src="assets/img/icons/${geoFiveDay.iconId4}.png" width="50px;"/>`;
			document.querySelector('.fiveDate4').innerHTML = geoFiveDay.date4;
			document.querySelector('.fiveCity4').innerHTML = geoFiveDay.city4;
			document.querySelector('.fiveCountry4').innerHTML = geoFiveDay.country4;
			document.querySelector('.fiveTemp4').innerHTML = geoFiveDay.temperature.celcius4;
			document.querySelector('.fiveDesc4').innerHTML = geoFiveDay.description4;

}

var geoDailyForecast = {

}
geoDailyForecast.temperature = {

}
function dailyForecast(latitude, longitude){
	let dailyForecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api}`;

	fetch(dailyForecastApi)
		.then(response => response.json())
		.then(function(data){
			geoDailyForecast.iconId = data.list[0].weather[0].icon;
			geoDailyForecast.city = data.city.name;
			geoDailyForecast.country = data.city.country;
			geoDailyForecast.temperature.celcius = data.list[0].main.temp;
			geoDailyForecast.description = data.list[0].weather[0].description;
			geoDailyForecast.date = data.list[0].dt_txt;

			//Day 2
			geoDailyForecast.iconId2 = data.list[8].weather[0].icon;
			geoDailyForecast.city2 = data.city.name;
			geoDailyForecast.country2 = data.city.country;
			geoDailyForecast.temperature.celcius2 = data.list[8].main.temp;
			geoDailyForecast.description2 = data.list[8].weather[0].description;
			geoDailyForecast.date2 = data.list[8].dt_txt;

			//Day 3
			geoDailyForecast.iconId3 = data.list[16].weather[0].icon;
			geoDailyForecast.city3 = data.city.name;
			geoDailyForecast.country3 = data.city.country;
			geoDailyForecast.temperature.celcius3 = data.list[16].main.temp;
			geoDailyForecast.description3 = data.list[16].weather[0].description;
			geoDailyForecast.date3 = data.list[16].dt_txt;

			//Day 4
			geoDailyForecast.iconId4 = data.list[24].weather[0].icon;
			geoDailyForecast.city4 = data.city.name;
			geoDailyForecast.country4 = data.city.country;
			geoDailyForecast.temperature.celcius4 = data.list[24].main.temp;
			geoDailyForecast.description4 = data.list[24].weather[0].description;
			geoDailyForecast.date4 = data.list[24].dt_txt;
	})
	.then(function(){
		displayDailyForecast();
	})
}

function displayDailyForecast(){
			//Day 1 weather forecast display
			document.querySelector('.dailyIcon1').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId}.png">`;
			document.querySelector('.dailyTemperature1').innerHTML = geoDailyForecast.temperature.celcius;
			document.querySelector('.dailyDescription1').innerHTML = geoDailyForecast.description;
			document.querySelector('.dailyDate1').innerHTML = geoDailyForecast.date;

			//Day 2 weather forecast display
			document.querySelector('.dailyIcon2').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId2}.png">`;
			document.querySelector('.dailyTemperature2').innerHTML = geoDailyForecast.temperature.celcius2;
			document.querySelector('.dailyDescription2').innerHTML = geoDailyForecast.description2;
			document.querySelector('.dailyDate2').innerHTML = geoDailyForecast.date2;

			//Day 3 weather forecast display
			document.querySelector('.dailyIcon3').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId3}.png">`;
			document.querySelector('.dailyTemperature3').innerHTML = geoDailyForecast.temperature.celcius3;
			document.querySelector('.dailyDescription3').innerHTML = geoDailyForecast.description3;
			document.querySelector('.dailyDate3').innerHTML = geoDailyForecast.date3;

			//Day 4 weather forecast display
			document.querySelector('.dailyIcon4').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId4}.png">`;
			document.querySelector('.dailyTemperature4').innerHTML = geoDailyForecast.temperature.celcius4;
			document.querySelector('.dailyDescription4').innerHTML = geoDailyForecast.description4;
			document.querySelector('.dailyDate4').innerHTML = geoDailyForecast.date4;
}

var searchDailyWeather = {};

searchDailyWeather.temperature = {

}

var searchInput = document.getElementById('searchInput.value');
var dailySearch = document.getElementById('dailySearch');


dailySearch.addEventListener('click', function(){
	function dailyForecastSearch(){
		let dailySearchApi = (`https://api.openweathermap.org/data/2.5/forecast?q=`+searchInput.value+`&appid=${api}`);
		console.log(dailySearchApi);
		fetch(dailySearchApi)
			
			.then(response => response.json())
			.then(function(data){
				console.log(data);
				searchDailyWeather.iconId = data.list[0].weather[0].icon;
				searchDailyWeather.city = data.city.name;
				searchDailyWeather.country = data.city.country;
				searchDailyWeather.temperature.celcius = data.list[0].main.temp;
				searchDailyWeather.description = data.list[0].weather[0].description;
				searchDailyWeather.date = data.list[0].dt_txt;
				console.log(geoDailyForecast);
	
				//Day 2
				searchDailyWeather.iconId2 = data.list[8].weather[0].icon;
				searchDailyWeather.city2 = data.city.name;
				searchDailyWeather.country2 = data.city.country;
				searchDailyWeather.temperature.celcius2 = data.list[8].main.temp;
				searchDailyWeather.description2 = data.list[8].weather[0].description;
				searchDailyWeather.date2 = data.list[8].dt_txt;
				console.log(data);
	
				//Day 3
				searchDailyWeather.iconId3 = data.list[16].weather[0].icon;
				searchDailyWeather.city3 = data.city.name;
				searchDailyWeather.country3 = data.city.country;
				searchDailyWeather.temperature.celcius3 = data.list[16].main.temp;
				searchDailyWeather.description3 = data.list[16].weather[0].description;
				searchDailyWeather.date3 = data.list[16].dt_txt;
				console.log(searchDailyWeather);
			})
			.then(function(){
				displayDailySearch();
				})
			}
	})

	function displayDailySearch(){
				document.querySelector('.searchIcon1').innerHTML = `<img src="assets/img/icons/${searchDailyWeather.iconId}.png">`;
				document.querySelector('.searchTemp1').innerHTML = searchDailyWeather.temperature.celcius;
				document.querySelector('.searchDesc1').innerHTML = searchDailyWeather.description;
				document.querySelector('.searchCity1').innerHTML = searchDailyWeather.name;
				document.querySelector('.searchCountry1').innerHTML = searchDailyWeather.city.country;

				//Day 2 weather forecast display
				document.querySelector('.searchIcon2').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId}.png">`;
				document.querySelector('.searchTemp2').innerHTML = geoDailyForecast.temperature.celcius;
				document.querySelector('.searchDesc2').innerHTML = searchDailyWeather.description;
				document.querySelector('.searchCity2').innerHTML = searchDailyWeather.name;
				document.querySelector('.searchCountry2').innerHTML = searchDailyWeather.city.country;
			
				//Day 3 weather forecast display
				document.querySelector('.dailyIcon3').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId3}.png">`;
				document.querySelector('.dailyTemperature3').innerHTML = geoDailyForecast.temperature.celcius3;
				document.querySelector('.dailyDescription3').innerHTML = geoDailyForecast.description3;
				document.querySelector('.dailyDate3').innerHTML = geoDailyForecast.date3;
			
				//Day 4 weather forecast display
				document.querySelector('.dailyIcon4').innerHTML = `<img src="assets/img/icons/${geoDailyForecast.iconId4}.png">`;
				document.querySelector('.dailyTemperature4').innerHTML = geoDailyForecast.temperature.celcius4;
				document.querySelector('.dailyDescription4').innerHTML = geoDailyForecast.description4;
				document.querySelector('.dailyDate4').innerHTML = geoDailyForecast.date4;
	}