/* gulpfile.js */

/**
* Import uswds-compile
*/
const uswds = require("@uswds/compile");

/**
* USWDS version
* Set the major version of USWDS you're using
* (Current options are the numbers 2 or 3)
*/
uswds.settings.version = 3;

/**
* Path settings
* Set as many as you need
*/
uswds.paths.dist.css = './src/assets/uswds/css';
uswds.paths.dist.img = './src/assets/uswds/img';
uswds.paths.dist.fonts = './src/assets/uswds/fonts';
uswds.paths.dist.js = './src/assets/uswds/js';
uswds.paths.dist.theme = './src/assets/uswds/sass';

/**
* Exports
* Add as many as you need
*/
exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;