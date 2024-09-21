const { STATUS, MESSAGE } = require("../config/status.config");

const generateOkResponse = (code, message, user, token) => ({
  ...(code && { code }),
  ...(message && { message }),
  ...(user && { user }),
  ...(token && { token }),
});

const generateErrorMessage = (code, message, error) => ({
  ...(code && { code }),
  ...(message && { message }),
  ...(error && { error }),
});

const catchMessage = (res, error) => {
  console.log(error);
  if (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send(
        generateErrorMessage(
          STATUS.INTERNAL_SERVER_ERROR,
          MESSAGE.INTERNAL_SERVER_ERROR,
          error
        )
      );
  } else {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send(
        generateErrorMessage(
          STATUS.INTERNAL_SERVER_ERROR,
          MESSAGE.SERVER_UNKNOWN
        )
      );
  }
};

const catchGenericMessage = (res, error) => {
  console.log(error);
  res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send(
      generateErrorMessage(
        STATUS.INTERNAL_SERVER_ERROR,
        MESSAGE.CATCH_SERVER,
        error
      )
    );
};

module.exports = {
  catchMessage,
  catchGenericMessage,
  generateOkResponse,
  generateErrorMessage,
};
