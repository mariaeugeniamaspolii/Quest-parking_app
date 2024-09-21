const { STATUS, MESSAGE } = require("../config/status.config");
const { generateErrorMessage } = require("../controllers/messages.controller");
const { verifyJWT } = require("../controllers/jwt.controller.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send(
        generateErrorMessage(
          STATUS.UNAUTHORIZED,
          MESSAGE.UNAUTHORIZED,
          MESSAGE.MISSING_TOKEN
        )
      );
  }

  verifyJWT(token, (error, decoded) => {
    if (error) {
      return res
        .status(STATUS.FORBIDDEN)
        .send(
          generateErrorMessage(
            STATUS.FORBIDDEN,
            MESSAGE.FORBIDDEN,
            MESSAGE.TOKEN_EXPIRED
          )
        );
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
