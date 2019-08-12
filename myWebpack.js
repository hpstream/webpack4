const path = require('path');
var Complier = require('./lib/Compiler.js');
var config = require(path.resolve(__dirname, 'webpack.config.js'));

var complier = new Complier(config);


complier.run();


