const {getAllForecastsEvent,} = require('./events');
const {setUID,} = require('./firebaseApi');
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      // User is signed in.
      $('#searchForm').removeClass('hide');
      $('#authScreen').addClass('hide');
      getAllForecastsEvent();
      $('#logout, #weatherOutput').removeClass('hide');
    } else {
      // No user is signed in.
      $('#searchForm').addClass('hide');
      $('#authScreen').removeClass('hide');
      $('#logout, #weatherOutput').addClass('hide');
    }
  });
};

module.exports = {
  checkLoginStatus,
};
