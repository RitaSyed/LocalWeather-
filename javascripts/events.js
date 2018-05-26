const searchWeather = require('./searchWeather');
const pressEnter = () => {
  $('#submitBtn').click(() => {
    const searchZipcode = $('#searchBar').val();
    searchWeather.showResults(searchZipcode);
    validateZipcode(searchZipcode);
  });
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZipcode = $('#searchBar').val().replace(' ', '%20');
      searchWeather.showResults(searchZipcode);
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

const initializer = () => {
  pressEnter();
};

module.exports = {
  initializer,
};
