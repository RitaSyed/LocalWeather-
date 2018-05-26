const searchWeather = require('./searchWeather');
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

const initializer = () => {
  pressEnter();
  $(document).on('click', '#fiveDayBtn', () => {
    searchWeather.showResults(zipcode, 'forecast');
  });
};

module.exports = {
  initializer,
};
