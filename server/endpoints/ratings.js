const express = require("express");
const router = express.Router();

const {
    findRatings,
    findRatingById,
    createRating,
} = require("../controllers/rating");

// Find all ratings
router.get("/", async (req, res) => {
    try {
        const ratings = await findRatings(req.query);
        res.json({ ratings });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find rating by id
router.get("/:id", async (req, res) => {
    try {
        const rating = await findRatingById(req.params.id);
        res.json({
            rating
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create rating
router.post("/", async (req, res) => {
    try {
        const newRating = await createRating(req.body);
        res.json({
            rating: newRating
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;