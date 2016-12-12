var connect = require('gulp-connect');
require('dotenv').config();

module.exports = function () {
  return new Promise((resolve) => {
    connect.server({
      root: process.env.BUILD_PATH,
      livereload: false,
    });
    resolve();
  });
};
