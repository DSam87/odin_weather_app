"use strict";

const cityNameContainer = document.querySelector(".text");
const stateNameContainer = document.querySelector(".state-name");
const cityWeatherIconContainer = document.querySelector(".city-weather-icon");
const cityTempContainer = document.querySelector(".weather-temp");
const cityDescriptionContainer = document.querySelector(".weather-description");

class WetherProgram {
  constructor() {
    this.city;
    this.state;
    this.lat;
    this.lng;

    this.temp;
    this.weather;
    this.wind;
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(this.setLocation.bind(this), () =>
      alert("We need your location")
    );
    return new Promise((resolve, reject) => {
      resolve("dog");
    });
  }

  setLocation(v) {
    console.log(v);
    this.lat = v.coords.latitude;
    this.lng = v.coords.longitude;

    console.log(this);
    this.setCity();
  }

  async setCity() {
    const response = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=Zx8IaXNctsMCE6o8bhfBucj0nJetAl4C&location=${this.lat},${this.lng}&includeRoadMetadata=true&includeNearestIntersection=true`
    );
    const json = await response.json();
    this.city = json.results[0].locations[0].adminArea5;
    this.state = json.results[0].locations[0].adminArea3;
    pro.setCityInfo();
  }

  async setCityInfo() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=73851be5b03eba812ab410fd22c9ed9e`
    );
    const json = await response.json();

    console.log(json);
    this.temp = json.main;
    this.weather = json.weather[0];
    this.wind = json.wind;
    this.displayWetherHTML();
  }

  async displayWetherHTML() {
    console.log(this);
    cityNameContainer.innerHTML = this.city.toUpperCase();
    stateNameContainer.innerHTML = this.state.toUpperCase();
    console.log(this.weather.icon);
    cityWeatherIconContainer.style.backgroundImage = `url(http://openweathermap.org/img/wn/${this.weather.icon}@4x.png)`;

    this.avrTimp = (this.temp.temp_min + this.temp.temp_max + 2.0) / 2;
    this.avrTimpFahrenheit = Math.round(((this.avrTimp - 273.15) * 9) / 5 + 32);
    cityTempContainer.innerHTML = `${this.avrTimpFahrenheit}°`;

    cityDescriptionContainer.innerHTML = `${this.weather.description.toUpperCase()}`;
  }
}

const pro = new WetherProgram();
pro.getLocation();

// Using OpenWeather Api
