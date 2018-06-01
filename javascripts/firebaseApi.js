let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const saveCurrentForecast = (newForecast) => {
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
      url: `${firebaseConfig.databaseURL}/forecasts.json`,
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

module.exports = {
  setConfig,
  saveCurrentForecast,
  getAllSavedForecasts,
};
