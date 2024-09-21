const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

const validatePassword = (bodyPassword, userPassword) => {
  return bcrypt.compareSync(bodyPassword, userPassword);
};

module.exports = {
  hashPassword,
  validatePassword,
};
