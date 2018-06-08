let firebaseConfig = {};
let uid = '';

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};
const setUID = (newUID) => {
  uid = newUID;
};
const saveCurrentForecast = (newForecast) => {
  newForecast.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
      data: JSON.stringify(newForecast),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getAllSavedForecasts = () => {
  return new Promise((resolve, reject) => {
    const allForecastsArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allForecastsObj) => {
        if (allForecastsObj !== null) {
          Object.keys(allForecastsObj).forEach((fbKey) => {
            allForecastsObj[fbKey].id = fbKey;
            allForecastsArray.push(allForecastsObj[fbKey]);
          });
        }
        resolve(allForecastsArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteForecastFromDb = (forecastId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/forecasts/${forecastId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateForecastToBeScaryInDb = (updatedForecast, forecastId) => {
  updatedForecast.uid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/forecasts/${forecastId}.json`,
      data: JSON.stringify(updatedForecast),
    })
      .done((modifiedForecast) => {
        resolve(modifiedForecast);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  setUID,
  saveCurrentForecast,
  getAllSavedForecasts,
  deleteForecastFromDb,
  updateForecastToBeScaryInDb,
};
