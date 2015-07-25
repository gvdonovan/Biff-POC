var path = require('path');

var appRoot = './src/';

module.exports = {
  bower: {
 	  directory: './bower_components/',
    bowerJson: require('../bower.json' )
  },
  client: appRoot + 'client/',
  vendor: appRoot + 'client/vendor/',
  source: appRoot + 'client/app/**/*.js',
  html:   appRoot + 'client/**/*.html'
};
