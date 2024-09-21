const express = require("express");
const router = express.Router();

const bookingsRouter = require("./endpoints/bookings");
const meteredparkingsRouter = require("./endpoints/meteredparkings");
const parkingsRouter = require("./endpoints/parkings");
const propertiesRouter = require("./endpoints/properties");
const ratingsRouter = require("./endpoints/ratings");
const searchesRouter = require("./endpoints/searches");
const servicesRouter = require("./endpoints/services");
const usersRouter = require("./endpoints/users");
const vehiclesRouter = require("./endpoints/vehicles");

router.use("/bookings", bookingsRouter);
router.use("/meteredparkings", meteredparkingsRouter);
router.use("/parkings", parkingsRouter);
router.use("/properties", propertiesRouter);
router.use("/ratings", ratingsRouter);
router.use("/searches", servicesRouter);
router.use("/services", servicesRouter);
router.use("/users", usersRouter);
router.use("/vehicles", vehiclesRouter);

module.exports = router;
