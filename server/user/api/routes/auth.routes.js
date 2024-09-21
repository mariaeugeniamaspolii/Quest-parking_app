const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const emailController = require("../controllers/email.controller");
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Sign up and Sign in
 */

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Creates a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserSignUpBody'
   *     responses:
   *       201:
   *         description: User successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/OK'
   *             example:
   *               code: 201
   *               message: OK_CREATED
   *               user:
   *                 id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
   *                 name: John Doe
   *                 username: johndoe
   *                 email: johndoe@mail.com
   *                 additionalInfo: {}
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 400
   *               message: BAD_REQUEST
   *               error: MISSING_INFO
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 500
   *               message: INTERNAL_SERVER_ERROR
   *               error: INTERNAL_SERVER_ERROR
   */
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateEmail],
    // [verifySignUp.checkDuplicateUsername, verifySignUp.checkDuplicateEmail],
    controller.signUp
  );

  /**
   * @swagger
   * /api/auth/signin:
   *   post:
   *     summary: Creates a user login with token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserSignInBody'
   *     responses:
   *       200:
   *         description: The user information with authentication token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/LoginOk'
   *             example:
   *               code: 200
   *               message: OK
   *               user:
   *                 id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
   *                 name: John Doe
   *                 username: johndoe
   *                 email: johndoe@mail.com
   *                 additionalInfo: {}
   *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 400
   *               message: BAD_REQUEST
   *               error: MISSING_INFO
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 500
   *               message: INTERNAL_SERVER_ERROR
   *               error: INTERNAL_SERVER_ERROR
   */
  app.post("/api/auth/signin", controller.signIn);

  app.post("/api/auth/check-email", emailController.checkEmailExistence);
  
};
