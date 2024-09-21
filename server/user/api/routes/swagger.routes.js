const {
  swaggerMiddleware,
  setupMiddleware,
} = require("../middlewares/swagger");

module.exports = (app) => {
  app.get("/", (req, res) => res.redirect("/docs"));
  app.use("/docs", swaggerMiddleware, setupMiddleware);
};
