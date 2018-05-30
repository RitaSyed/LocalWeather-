const dom = require('./dom');
let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const weather = (zipcode, forecast) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/${forecast}?zip=${zipcode},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (searchText, forecast) => {
  weather(searchText, forecast)
    .then((result) => {
      if (forecast === 'weather') {
      // console.error('weather');
        dom.domString(result);
      }
      if (forecast === 'forecast') {
        dom.strang5dayForecast(result);
        // console.error('forecast');
      };
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  setKey,
  showResults,
};
