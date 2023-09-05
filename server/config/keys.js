if (process.NODE_ENV === 'production') {
  // To ne commited
  module.exports = require('./prod');
} else {
  //Not to be committed
  module.exports = require('./dev');
}
