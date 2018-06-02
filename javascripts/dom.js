// const events = require('./events');
const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class="col-sm-4 col-sm-offset-4 card">`;
  strang +=  `<div class="thumbnail forecastCard">`;
  strang +=   `<div class="caption">`;
  strang +=     `<h3 class="forecast-city-name">${weatherArray.name}</h3>`;
  strang +=     `<h4 class="forecast-temp">${weatherArray.main.temp}&#8457;</h4>`;
  strang +=     `<p class="forecast-description"><strong>Current Conditions: </strong>${weatherArray.weather[0].description}</p>`;
  strang +=     `<p class="forecast-pressure"><strong>Barometric Pressure: </strong>${weatherArray.main.pressure} hPa</p>`;
  strang +=     `<p class="forecast-wind-speed"><strong>Wind Speed: </strong>${weatherArray.wind.speed} mph</p>`;
  strang +=     `<p><a href="#" id="fiveDayBtn" class="btn btn-default" role="button">5-Day</a><a href="#" class="btn btn-default saveForecast" role="button">Save Forecast</a></p>`;
  strang +=   `</div>`;
  strang +=  `</div>`;
  strang += `</div>`;
  printToDom(strang);
};
const strang5dayForecast = (forecast) => {
  let strang = '';
  forecast.list.forEach((oneDay, index) => {
    if (index % 8 === 0) {
      strang += `<div class="col-sm-6 col-md-4 card">`;
      strang +=  `<div class="thumbnail">`;
      strang +=   `<div class="caption">`;
      strang +=     `<h3>${forecast.city.name}</h3>`;
      strang +=     `<h4>${oneDay.main.temp}&#8457;</h4>`;
      strang +=     `<p><strong>Current Conditions: </strong>${oneDay.weather[0].description}</p>`;
      strang +=     `<p><strong>Barometric Pressure: </strong>${oneDay.main.pressure} hPa</p>`;
      strang +=     `<p><strong>Wind Speed: </strong>${oneDay.wind.speed} mph</p>`;
      strang +=     `<p><a href="#" id="WeatherNowBtn" class="btn btn-default" role="button">Current Forecast</a>`;
      strang +=   `</div>`;
      strang +=  `</div>`;
      strang += `</div>`;
    };
  });
  printToDom(strang);
};

const savesForecasts = (forecast) => {
  let strang = '';
  forecast.forEach((oneDay) => {
    strang += `<div class="col-sm-6 col-md-4">`;
    strang +=  `<div class="thumbnail forecastCard" data-firebase-id="${oneDay.id}">`;
    strang +=   `<div class="caption">`;
    strang +=     `<a class="btn btn-danger deleteBtn">X</a>`;
    strang +=     `<h3>${oneDay.city}</h3>`;
    strang +=     `<h4>${oneDay.temperature}&#8457;</h4>`;
    strang +=     `<p>${oneDay.description}</p>`;
    strang +=     `<p>${oneDay.pressure} hPa</p>`;
    strang +=     `<p>${oneDay.windSpeed} mph</p>`;

    // strang +=     `<p><a href="#" id="WeatherNowBtn" class="btn btn-default" role="button">Current Forecast</a>`;
    strang +=   `</div>`;
    strang +=  `</div>`;
    strang += `</div>`;
  });
  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#weatherOutput').html(stringz);
};

module.exports = {
  domString,
  strang5dayForecast,
  savesForecasts,
};
