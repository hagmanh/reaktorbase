const gulp = require('gulp');
const assemble = require('fabricator-assemble');
const runSequence = require('run-sequence');
const del = require('del');
const handlebars = require('handlebars');
const flatten = require('gulp-flatten');
const util = require('gulp-util');
const clean = require('../tools/clean');

require('dotenv').config();

//ASSEMBLE
module.exports = () => {

    const flattenstructure = () => {
      return new Promise((resolve, reject) => {
        gulp.src(process.env.BUILD_PATH + 'tempmockups/**/*.html')
          .pipe(flatten())
          .pipe(gulp.dest(process.env.BUILD_PATH + 'mockups'))
          .on('end', resolve);
      });
    };

    const buildmocks = () => {
      const materials = process.env.MOCK_COMPONENTS.split(',');
      const pages = [process.env.MOCK_PAGES];
      const options = {
          layout: 'default',
          layouts: 'app/framework/*',
          layoutIncludes: 'app/framework/includes/*.html',
          views: pages,
          materials: materials,
          data: 'config/*.{json,yml}',
          docs: 'docs/**/*.md',
          keys: {
              materials: 'materials',
              views: 'views',
              docs: 'docs',
            },
          helpers: require('../../node_modules/knit-ninja/helpers')(handlebars),
          logErrors: false,
          onError: (error) => {
            console.log(error);
          },
          dest: process.env.BUILD_PATH + 'tempmockups',
      };
      return assemble(options);
    };

    util.log(util.colors.green('Assembling mockups...'));

    return new Promise((resolve, reject) => {
      buildmocks();
      flattenstructure().then(clean(process.env.BUILD_PATH + 'tempmockups'))
                        .then(() => {
                          util.log(util.colors.green('Finished assembling mockups... 👍'));
                          resolve();
                        });
    });

};
