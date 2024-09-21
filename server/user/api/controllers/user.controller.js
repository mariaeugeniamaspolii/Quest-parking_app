const db = require("../models");
const User = db.user;

const { STATUS, MESSAGE } = require("../config/status.config");

const {
  generateOkResponse,
  generateErrorMessage,
  catchMessage,
  catchGenericMessage,
} = require("./messages.controller");
const { validatePassword } = require("./crypt.controller");

exports.getUser = (req, res) => {
  try {
    User.findById(req.userId)
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

        res.status(STATUS.OK).send(
          generateOkResponse(STATUS.OK, MESSAGE.OK, {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            rank: user.rank,
            avatar: user.avatar,
            subscription: user.subscription,
            messages: user.messages,
            paymentMethod: user.paymentMethod,
            properties: user.properties,
            parkings: user.parkings,
            vehicles: user.vehicles,
            favorites: user.favorites,
            bookings: user.bookings,
            searches: user.searches,
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

exports.updateUser = (req, res) => {
  try {
    User.findById(req.userId)
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

        const { name, additionalInfo } = req.body;

        user.name = name ?? user.name;
        user.additionalInfo = {
          ...user.additionalInfo,
          ...additionalInfo,
        };

        user.save().then(() => {
          res.status(STATUS.OK).send(
            generateOkResponse(STATUS.OK, MESSAGE.MODIFIED, {
              name: user.name,
              username: user.username,
              email: user.email,
              additionalInfo: user.additionalInfo,
            })
          );
        });
      })
      .catch((error) => {
        catchMessage(res, error);
      });
  } catch (error) {
    catchGenericMessage(res, error);
  }
};

exports.deleteUser = (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
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

    User.findById(req.userId)
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

        User.deleteOne(user).then((user) => {
          res
            .status(STATUS.OK)
            .send(generateOkResponse(STATUS.OK, MESSAGE.DELETED, user));
        });
      })
      .catch((error) => {
        catchMessage(res, error);
      });
  } catch (error) {
    catchGenericMessage(res, error);
  }
};
