'use strict';

var initRoutes = function(app) {
  // Insert routes below
  app.use('/api/verse', require('./api/verse.js'));
};

module.exports = initRoutes;
