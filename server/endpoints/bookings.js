const express = require("express");
const router = express.Router();

const {
    findBookings,
    findBookingsById,
    createBookings,
} = require("../controllers/booking");

// Find all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await findBookings(req.query);
        res.json({ bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find bookings by id
router.get("/:id", async (req, res) => {
    try {
        const bookings = await findBookingsById(req.params.id);
        res.json({
            bookings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create bookings
router.post("/", async (req, res) => {
    try {
        const newBookings = await createBookings(req.body);
        res.json({
            bookings: newBookings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;