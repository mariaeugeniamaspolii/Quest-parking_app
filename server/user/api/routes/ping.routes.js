const { MESSAGE } = require("../config/status.config");

/**
 * @swagger
 * tags:
 *   - name: Server
 *     description: Server status test
 */

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Verifies the server is running
 *     tags: [Server]
 *     responses:
 *       200:
 *         description: Responds with simple `pong 🏓` text
 *         content:
 *            text/plain:
 *              schema:
 *                type: string
 *                example: pong 🏓
 */
module.exports = (app) => {
  app.get("/api/ping", (req, res) => {
    res.send(MESSAGE.PONG);
  });
};
