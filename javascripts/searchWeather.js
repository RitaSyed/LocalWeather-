const dom = require('./dom');
let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
  console.error(weatherKey);
};

const weather = (zipcode) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (searchText) => {
  weather(searchText)
    .then((result) => {
      dom.domString(result);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  setKey,
  showResults,
};
