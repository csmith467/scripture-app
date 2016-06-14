'use strict';

var initRoutes = function(app) {
  // Insert routes below
  app.use('/api/user', require('./api/user.js'));
  app.use('/api/verse', require('./api/verse.js'));
  app.use('/api/bible', require('./api/bible.js'));
  app.use('/api/book', require('./api/book.js'));
};

module.exports = initRoutes;
