/// <binding AfterBuild='default' />
var gulp = require("gulp"),
    plugins = require('gulp-load-plugins')({scope: ['dependencies']});

const defaultTask = require('./config/tasks/default')(gulp, plugins);
const test = require('./config/tasks/test')(gulp, plugins);
const build = require('./config/tasks/build')(gulp, plugins);
const watch = require('./config/tasks/watch')(gulp, plugins);
const develop = require('./config/tasks/develop')(gulp, plugins);

//Accessible TODO: move to tools?
gulp.task('accessible', require('./config/tasks/accessibility')(gulp, plugins));
