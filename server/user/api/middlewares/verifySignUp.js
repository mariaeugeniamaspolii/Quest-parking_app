const db = require("../models");
const User = db.user;

const { STATUS, MESSAGE } = require("../config/status.config");
const {
  generateErrorMessage,
  catchMessage,
  catchGenericMessage,
} = require("../controllers/messages.controller");

// checkDuplicateUsername = (req, res, next) => {
//   try {
//     User.findOne({
//       username: req.body.username,
//     })
//       .exec()
//       .then((user) => {
//         if (user) {
//           return res
//             .status(STATUS.BAD_REQUEST)
//             .send(
//               generateErrorMessage(
//                 STATUS.BAD_REQUEST,
//                 MESSAGE.BAD_REQUEST,
//                 MESSAGE.DUPLICATED_USERNAME
//               )
//             );
//         }

//         next();
//       })
//       .catch((error) => {
//         catchMessage(res, error);
//       });
//   } catch (error) {
//     catchGenericMessage(res, error);
//   }
// };

checkDuplicateEmail = (req, res, next) => {
  try {
    User.findOne({
      email: req.body.email,
    })
      .exec()
      .then((user) => {
        if (user) {
          return res
            .status(STATUS.BAD_REQUEST)
            .send(
              generateErrorMessage(
                STATUS.BAD_REQUEST,
                MESSAGE.BAD_REQUEST,
                MESSAGE.DUPLICATED_EMAIL
              )
            );
        }

        next();
      })
      .catch((error) => {
        catchMessage(res, error);
      });
  } catch (error) {
    catchGenericMessage(res, error);
  }
};

// const verifySignUp = { checkDuplicateUsername, checkDuplicateEmail };
const verifySignUp = { checkDuplicateEmail };

module.exports = verifySignUp;
