const clean = require('../tools/clean');
const eslint = require('../tools/eslint');
const js = require('../tools/js');
const sass = require('../tools/sass');
const templates = require('../tools/templates');
const assemble = require('../tools/assemble');
const copy = require('../tools/copy');
const server = require('../tools/server');
const util = require('gulp-util');

module.exports = function (gulp, plugins) {
  return gulp.task('build', () => {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

    util.log(util.colors.cyan(`Building frontend for environment ${process.env.NODE_ENV}`));
    return clean('js').then(eslint)
                  .then(js)
                  .then(templates)
                  .then(sass)
                  .then(assemble)
                  .then(copy);
  });
};
