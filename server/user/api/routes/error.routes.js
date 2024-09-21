const { STATUS, MESSAGE } = require("../config/status.config");
const { generateErrorMessage } = require("../controllers/messages.controller");

module.exports = (app) => {
  app.all("*", (req, res) => {
    res
      .status(STATUS.NOT_FOUND)
      .send(
        generateErrorMessage(
          STATUS.NOT_FOUND,
          MESSAGE.NOT_FOUND,
          MESSAGE.UNKNOWN_ROUTE
        )
      );
  });
};
