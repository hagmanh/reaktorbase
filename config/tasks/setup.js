var run = require('gulp-run');

module.exports = function (gulp, plugins) {
  return () => {
    const bowerComplete = false;
    const npmComplete = false;

    //complete
    var complete = function () {
      if (bowerComplete && npmComplete) {
        run('asciify "Complete" -f larry3d').exec();
      }
    };

    //bower
    run('bower update').exec(function (status) {
      console.log('-------------------- BOWER UPDATE: ' + ((status + '') === 'null' ? 'OK' : status) + ' --------------------');
      bowerComplete = true;
      complete();
    });

    //npm
    run('npm install').exec(function (status) {
      console.log('-------------------- NPM INSTALL: ' + ((status + '') === 'null' ? 'OK' : status) + ' --------------------');
      npmComplete = true;
      complete();
    });
  };
};
