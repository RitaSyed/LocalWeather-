const searchWeather = require('./searchWeather');
const firebaseApi = require('./firebaseApi');
let zipcode = '';

const setZipCode = (zip) => {
  zipcode = zip;
};

const pressEnter = () => {
  $('#submitBtn').click(() => {
    const searchZipcode = $('#searchBar').val();
    setZipCode(searchZipcode);
    searchWeather.showResults(searchZipcode, 'weather');
    validateZipcode(searchZipcode);
  });
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZipcode = $('#searchBar').val().replace(' ', '%20');
      setZipCode(searchZipcode);
      searchWeather.showResults(searchZipcode, 'weather');
      validateZipcode(searchZipcode);
    }
  });
};

const validateZipcode = (input) => {
  const inputNumbers = /[0-9]/.test(input);
  if (inputNumbers && input.length === 5) {
    return true;
  } else {
    return $('#weatherOutput').html(`Please enter a valid ZIP.`);
  }
};

const saveCurrentForecastEvent = () => {
  $(document).on('click', '.saveForecast', (e) => {
    const forecastToAddCard = $(e.target).closest('.forecastCard');
    const forecastToAdd = {
      city: forecastToAddCard.find('.forecast-city-name').text(),
      temperature: forecastToAddCard.find('.forecast-temp').text(),
      description: forecastToAddCard.find('.forecast-description').text(),
      pressure: forecastToAddCard.find('.forecast-pressure').text(),
      windSpeed: forecastToAddCard.find('.forecast-wind-speed').text(),
    };
    firebaseApi.saveCurrentForecast(forecastToAdd)
      .then(() => {

      })
      .catch((error) => {
        console.error('error in saving movie', error);
      });
  });
};

const initializer = () => {
  pressEnter();
  $(document).on('click', '#fiveDayBtn', () => {
    searchWeather.showResults(zipcode, 'forecast');
  });
  saveCurrentForecastEvent();
};

module.exports = {
  initializer,
};
