var path = require('path');

var appRoot = './src/';

module.exports = {
  bower: {
 	  directory: './bower_components/',
    bowerJson: require('../bower.json' ),
    ignorePath: '../..'
  },
  client: appRoot + 'client/',
  vendor: appRoot + 'client/vendor/',
  source: appRoot + 'client/app/**/*.js',
  html:   appRoot + 'client/**/*.html',
  style:  appRoot + 'client/css/',
  less:   appRoot + 'client/less/',
  es6:    appRoot + 'client/es6/',
  lib:    appRoot + 'client/lib/',
  karma: './'
};
