function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let mounths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "Nowember",
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMounth = mounths[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentDate} ${currentMounth} </br> 🕥 ${currentHour}:${currentMinutes}`;
}
let currentTime = new Date();
let currentDateTime = document.querySelector(".dateTime");
currentDateTime.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  celciusTemperature = response.data.main.temp;
  if (celciusTemperature > 0) {
    celciusTemperature = `+${Math.round(celciusTemperature)}`;
  }
  document.querySelector("#temperature").innerHTML = celciusTemperature;
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = `a350fa7c4ad24a3f0d0e06b5f5f554bf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
let saerchLocation = document.querySelector("#search-city");
saerchLocation.addEventListener("click", inputCity);

let inputPressEnter = document.querySelector("#input-city");
inputPressEnter.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("search-city").click();
  }
});

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  if (fahrenheitTemp > 0) {
    fahrenheitTemp = `+${fahrenheitTemp}`;
  }
  temperatureElement.innerHTML = fahrenheitTemp;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let celsiusTemp = document.querySelector("#temperature");
  celsiusTemp.innerHTML = celciusTemperature;
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `a350fa7c4ad24a3f0d0e06b5f5f554bf`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let buttonCurrentLocation = document.querySelector("#currentLocation");
buttonCurrentLocation.addEventListener("click", getCurrentPosition);

let celciusTemperature = null;

searchCity("Kharkiv");
