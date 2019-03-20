'use strict';
module.exports = function(app) {
  const db = require('../controllers/apiController');

  //login and retrieve user token
  app.route('/users/login')
    .post(db.login);
  //create a user and his credentials
  app.route('/users/register')
    .post(db.register);
  //retrive all riddles
  app.route('/riddles')
    .get(db.allRiddles);
  //retrieve riddles of a specific user
  app.route('/riddles/:userId')
    .get(db.userRiddles);
  //create a riddle
  app.route('/riddles')
    .post(db.createRiddle);
};
