let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
  console.error(weatherKey);
};

module.exports = {
  setKey,
};
