// const events = require('./events');
const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class="col-sm-4 col-sm-offset-4 card">`;
  strang +=  `<div class="thumbnail">`;
  strang +=   `<div class="caption">`;
  strang +=     `<h3>${weatherArray.name}</h3>`;
  strang +=     `<h4>${weatherArray.main.temp}&#8457;</h4>`;
  strang +=     `<p><strong>Current Conditions: </strong>${weatherArray.weather[0].description}</p>`;
  strang +=     `<p><strong>Barometric Pressure: </strong>${weatherArray.main.pressure} hPa</p>`;
  strang +=     `<p><strong>Wind Speed: </strong>${weatherArray.wind.speed} mph</p>`;
  strang +=     `<p><a href="#" id="WeatherNowBtn" class="btn btn-default" role="button">Weather Now</a> <a href="#" id="fiveDayBtn" class="btn btn-default" role="button">5-Day</a></p>`;
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
      strang +=     `<p><a href="#" id="WeatherNowBtn" class="btn btn-default" role="button">Weather Now</a> <a href="#" id="fiveDayBtn" class="btn btn-default" role="button">5-Day</a></p>`;
      strang +=   `</div>`;
      strang +=  `</div>`;
      strang += `</div>`;
    };
  });
  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#weatherOutput').html(stringz);
};
// const replaceDom = (stringz) => {
//   $('#weatherOutput').html(stringz);
// };

module.exports = {
  domString,
  strang5dayForecast,
};
