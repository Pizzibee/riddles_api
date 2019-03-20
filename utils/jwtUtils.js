const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hellomynameisSushil';

const generateTokenForUser = (userData) => {
  return jwt.sign({'userId': userData.user_id}, JWT_SECRET, {expiresIn: '1h'});
}

const parseAuthorization = (authorization) => {
  return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

const getUserId = (authorization) => {
  let userId = -1;
  const token = parseAuthorization(authorization);
  if (token != null){
    try {
      const jwtToken = jwt.verify(token, JWT_SECRET);
      if (jwtToken != null){
        userId = jwtToken.userId;
      }
    } catch (e) {}
  }
  return userId;
}

module.exports = {
  generateTokenForUser,
  getUserId
}
