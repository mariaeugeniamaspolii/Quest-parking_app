const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Actions with logged user
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
   * /api/user:
   *   get:
   *     summary: Get the user information
   *     description: Retrieve the details of the authenticated user
   *     tags: [User]
   *     security:
   *       - tokenAuth: []
   *     responses:
   *       200:
   *         description: User details successfully retrieved
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/OK'
   *             example:
   *               code: 200
   *               message: OK
   *               user:
   *                 id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
   *                 name: John Doe
   *                 username: johndoe
   *                 email: johndoe@mail.com
   *                 additionalInfo: {}
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 401
   *               message: UNAUTHORIZED
   *               error: MISSING_TOKEN
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 403
   *               message: FORBIDDEN
   *               error: TOKEN_EXPIRED
   *       404:
   *         description: Not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 404
   *               message: NOT_FOUND
   *               error: USER_NOT_FOUND
   */
  app.get("/api/user", [authJwt.verifyToken], controller.getUser);

  /**
   * @swagger
   * /api/user:
   *   put:
   *     summary: Update the user information
   *     description: |
   *       Update the details of the authenticated user.
   *       Only `name` and `additionalInfo` are allowed,
   *       `username`, `email` and `password` are not modified,
   *       `additionalInfo` is merged with the existing `additionalInfo`
   *     tags: [User]
   *     security:
   *       - tokenAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserUpdateBody'
   *     responses:
   *       200:
   *         description: User details successfully updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/OK'
   *             example:
   *               code: 200
   *               message: MODIFIED
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
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 401
   *               message: UNAUTHORIZED
   *               error: MISSING_TOKEN
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 403
   *               message: UNAUTHORIZED
   *               error: INVALID_PASSWORD
   *       404:
   *         description: Not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 404
   *               message: NOT_FOUND
   *               error: USER_NOT_FOUND
   */
  app.put("/api/user", [authJwt.verifyToken], controller.updateUser);

  /**
   * @swagger
   * /api/user:
   *   delete:
   *     summary: Delete the user
   *     description: Delete the authenticated user
   *     tags: [User]
   *     security:
   *       - tokenAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserDeleteBody'
   *     responses:
   *       200:
   *         description: User successfully deleted
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/OK'
   *             example:
   *               code: 200
   *               message: DELETED
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
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 401
   *               message: UNAUTHORIZED
   *               error: INVALID_PASSWORD
   *       403:
   *         description: Forbidden
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 403
   *               message: FORBIDDEN
   *               error: TOKEN_EXPIRED
   *       404:
   *         description: Not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/responses/Error'
   *             example:
   *               code: 404
   *               message: NOT_FOUND
   *               error: USER_NOT_FOUND
   */
  app.delete("/api/user", [authJwt.verifyToken], controller.deleteUser);
};
