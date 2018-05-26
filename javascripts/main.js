const events = require('./events');
const apiKeys = require('./apiKeys');
apiKeys.retrieveKeys();
events.initializer();
// $(document).ready(() => {
//   events.bindEvents();
// });
