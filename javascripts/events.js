const searchWeather = require('./searchWeather');
const pressEnter = () => {
  $('#submitBtn').click(() => {
    const searchWords = $('#searchBar').val();
    searchWeather.showResults(searchWords);
  });
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchWords = $('#searchBar').val().replace(' ', '%20');
      searchWeather.showResults(searchWords);
    }
  });
};

const initializer = () => {
  pressEnter();
};

module.exports = {
  initializer,
};
