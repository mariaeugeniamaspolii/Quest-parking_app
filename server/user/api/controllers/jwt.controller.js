const config = require("../config/auth.config");

const jwt = require("jsonwebtoken");

const ONE_WEEK_MS = 24 * 7 * 60 * 60;

const createJWT = (id) => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: ONE_WEEK_MS,
  });
};

const verifyJWT = (token, callback) => {
  jwt.verify(token, config.secret, callback);
};

module.exports = {
  createJWT,
  verifyJWT,
};
