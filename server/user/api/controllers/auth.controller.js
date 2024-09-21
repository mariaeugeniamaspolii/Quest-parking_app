const db = require("../models");
const User = db.user;

const { STATUS, MESSAGE } = require("../config/status.config");

const {
  generateOkResponse,
  generateErrorMessage,
  catchMessage,
  catchGenericMessage,
} = require("./messages.controller");
const { validatePassword, hashPassword } = require("./crypt.controller");
const { createJWT } = require("./jwt.controller");

const signIn = (req, res) => {
  try {
    const { email, password } = req.body;
    // const { username, email, password } = req.body;

    if ((!email) || !password) {
    // if ((!username && !email) || !password) {
      return res
        .status(STATUS.BAD_REQUEST)
        .send(
          generateErrorMessage(
            STATUS.BAD_REQUEST,
            MESSAGE.BAD_REQUEST,
            MESSAGE.MISSING_INFO
          )
        );
    }

    User.findOne({
      $or: [{ email }],
    })
      .exec()
      .then((user) => {
        if (!user) {
          return res
            .status(STATUS.NOT_FOUND)
            .send(
              generateErrorMessage(
                STATUS.NOT_FOUND,
                MESSAGE.NOT_FOUND,
                MESSAGE.USER_NOT_FOUND
              )
            );
        }

        const passwordIsValid = validatePassword(password, user.password);

        if (!passwordIsValid) {
          return res
            .status(STATUS.UNAUTHORIZED)
            .send(
              generateErrorMessage(
                STATUS.UNAUTHORIZED,
                MESSAGE.UNAUTHORIZED,
                MESSAGE.INVALID_PASSWORD
              )
            );
        }

        const token = createJWT(user._id);

        res.status(STATUS.OK).send(
          generateOkResponse(
            STATUS.OK,
            MESSAGE.OK,
            {
              id: user._id,
              name: user.name,
              // username: user.username,
              email: user.email,
              additionalInfo: user.additionalInfo,
            },
            token
          )
        );
      })
      .catch((error) => {
        catchMessage(res, error);
      });
  } catch (error) {
    catchGenericMessage(res, error);
  }
};

const signUp = (req, res) => {
  try {
    const { name, email, password, additionalInfo } = req.body;
    // const { name, username, email, password, additionalInfo } = req.body;

    if (!email || !password) {
      return res
        .status(STATUS.BAD_REQUEST)
        .send(
          generateErrorMessage(
            STATUS.BAD_REQUEST,
            MESSAGE.BAD_REQUEST,
            MESSAGE.MISSING_INFO
          )
        );
    }

    const cryptPassword = hashPassword(password);

    const user = new User({
      name,
      email,
      additionalInfo,
      password: cryptPassword,
    });

    user
      .save()
      .then((user) => {
        res.status(STATUS.CREATED).send(
          generateOkResponse(STATUS.CREATED, MESSAGE.CREATED, {
            id: user._id,
            name,
            // username,
            email,
            additionalInfo,
          })
        );
      })
      .catch((error) => {
        catchMessage(res, error);
      });
  } catch (error) {
    catchGenericMessage(res, error);
  }
};

module.exports = {
  signIn,
  signUp,
};
