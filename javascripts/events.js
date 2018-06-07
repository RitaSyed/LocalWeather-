const searchWeather = require('./searchWeather');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');
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
      isScary: false,
    };
    firebaseApi.saveCurrentForecast(forecastToAdd)
      .then(() => {

      })
      .catch((error) => {
        console.error('error in saving movie', error);
      });
  });
};

const getAllForecastsEvent = () => {
  firebaseApi.getAllSavedForecasts()
    .then((forecastsArray) => {
      dom.savesForecasts(forecastsArray);
    })
    .catch((error) => {
      console.error('error in get all forecasts event', error);
    });
};

const deleteForecastFromFirebase = () => {
  $(document).on('click', '.deleteBtn', (e) => {
    console.error('btn clicked');
    const forecastToDeleteId = $(e.target).closest('.forecastCard').data('firebaseId');
    firebaseApi.deleteForecastFromDb(forecastToDeleteId)
      .then(() => {
        getAllForecastsEvent();
      })
      .catch((error) => {
        console.error('error from delete movie', error);
      });
  });
};

const updateForecastEvent = () => {
  $(document).on('click', '.saveScaryForecast', (e) => {
    const forecastToUpdateId = $(e.target).closest('.forecastCard').data('firebaseId');
    const forecastToUpdateCard = $(e.target).closest('.card');
    const updatedForecast = {
      city: forecastToUpdateCard.find('.forecast-city-name').text(),
      temperature: forecastToUpdateCard.find('.forecast-temp').text(),
      description: forecastToUpdateCard.find('.forecast-description').text(),
      pressure: forecastToUpdateCard.find('.forecast-pressure').text(),
      windSpeed: forecastToUpdateCard.find('.forecast-wind-speed').text(),
      isScary: true,
    };
    firebaseApi.updateForecastToBeScaryInDb(updatedForecast, forecastToUpdateId)
      .then(() => {
        getAllForecastsEvent();
      })
      .catch((error) => {
        console.error('error in update forecast', error);
      });
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });
  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });
  $('#signin-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });
  $('#logout').click(() => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  });
};

const initializer = () => {
  pressEnter();
  $(document).on('click', '#fiveDayBtn', () => {
    searchWeather.showResults(zipcode, 'forecast');
  });
  saveCurrentForecastEvent();
  $(document).on('click', '#ViewSavedForecasts', getAllForecastsEvent);
  deleteForecastFromFirebase();
  updateForecastEvent();
  authEvents();
};

module.exports = {
  initializer,
  getAllForecastsEvent,
};
