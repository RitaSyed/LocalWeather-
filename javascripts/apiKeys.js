const searchWeather  = require('./searchWeather');
const firebaseApi = require('./firebaseApi');
const auth = require('./auth');
const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      searchWeather.setKey(results.weather.apiKey);
      firebaseApi.setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
      auth.checkLoginStatus();
    })
    .catch((err) => {
      console.error('no keys:', err);
    });
};

module.exports = {
  retrieveKeys,
};
