var del = require('del');
module.exports = (path) => {
  return new Promise((resolve) => {
    del(path, { force: true }).then(resolve);
  });
};
