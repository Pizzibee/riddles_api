const path = require('path');
const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const pool = new Pool({
  user: '', //add username here
  host: 'localhost',
  database: 'whelp_test',
  password: '', //add password here
  port: 5432,
});

const allRiddles = (request, response) => {
  pool.query('SELECT * FROM riddles', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const userRiddles = (request, response) => {
  const userId = parseInt(request.params.userId);
  pool.query('SELECT * FROM riddles WHERE creator_id = $1', [userId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const createRiddle = (request, response) => {
  const headerAuth = request.headers['authorization'];
  const userId = jwtUtils.getUserId(headerAuth);

  const { riddle, answer } = request.body;

  if (userId >= 0){
    pool.query('INSERT INTO riddles (riddle_id, riddle, answer, creator_id) VALUES (DEFAULT, $1, $2, $3) RETURNING riddle_id',
     [riddle, answer, userId], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({'success':true, 'riddleID': result.rows[0].riddle_id});
      return;
    });
  }else{
    response.status(401).json({'success':false, 'error': 'invalid token'});
    return;
  }
}

const login = async (request, response) => {
  const {email, password} = request.body;
  if (email == null || password == null){
    response.status(400).json({'success':false, 'error': 'missing parameters'});
    return;
  }
  if (email == "" || password == ""){
    response.status(400).json({'success':false, 'error': 'invalid parameters'});
    return;
  }
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length == 1){
    const user = result.rows[0];
    bcrypt.compare(password, user.password, (error, resBcrypt) => {
      if (resBcrypt){
        response.status(200).json({
          'userID': user.user_id,
          'token': jwtUtils.generateTokenForUser(user)
        });
      }else{
        response.status(403).json({'success':false, 'error': 'email or password incorrect'});
      }
    });
  }else{
    response.status(403).json({'success':false, 'error': 'email or password incorrect'});
  }
}

const register = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  if (firstName == null || lastName == null || email == null || password == null){
    response.status(400).json({'success':false, 'error': 'missing parameters'});
    return;
  }
  if (firstName === "" || lastName === "" || email === "" || password === ""){
    response.status(400).json({'success':false, 'error': 'invalid parameters'});
    return;
  }

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length > 0){
    response.status(409).json({'success':false, 'error': 'email already exists'});
    return;
  }
  bcrypt.hash(password, 5, (error, hashedPassword) => {
    pool.query('INSERT INTO users (user_id, first_name, last_name, email, password) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING user_id',
     [firstName, lastName, email, hashedPassword], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).json({'success':true, 'userID': result.rows[0].user_id});
    });
  });
}

module.exports = {
  allRiddles,
  register,
  login,
  userRiddles,
  createRiddle
}
