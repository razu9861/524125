const api = {
  key: "82005d27a116c2880c8f0fcb866998a0",
  base: "https://api.openweathermap.org/data/2.5/"
}
let iconElement = document.querySelector(".weather-icon");
let city = document.querySelector('.location .city');
let temp = document.querySelector(".temperature-value p");
let descElement = document.querySelector('.temperature-description p');
let hilow = document.querySelector('.hi-low');
let locationElement = document.querySelector(".current-location p");

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);

}

function displayResults (weather) {
  
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now);
  weather.iconId = weather.weather[0].icon;
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  descElement.innerHTML = weather.weather[0].main;
  locationElement.innerHTML = `${weather.name}, ${weather.sys.country}`;
  hilow.innerHTML = `Min : ${Math.round(weather.main.temp_min)}°c / Max: ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  const time = Date().slice(16,21);
  return `${day} ${date} ${month} ${year} ${time}`;
}
