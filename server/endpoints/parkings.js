const express = require("express");
const router = express.Router();

const {
    findParkings,
    findParkingById,
    createParking,
    updateParking,
    deleteParking,
} = require("../controllers/parking");

// Find all parkings
router.get("/", async (req, res) => {
    try {
        const parkings = await findParkings(req.query);
        res.json({ parkings });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find parking by id
router.get("/:id", async (req, res) => {
    try {
        const parking = await findParkingById(req.params.id);
        res.json({
            parking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create parking
router.post("/", async (req, res) => {
    try {
        const newParking = await createParking(req.body);
        res.json({
            parking: newParking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Update parking
router.put("/:id", async (req, res) => {
    try {
        const updatedParking = await updateParking(req.params.id, req.body);
        res.json({
            parking: updatedParking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Delete parking
router.delete("/:id", async (req, res) => {
    try {
        const deletedInfo = await deleteParking(req.params.id);
        res.json(deletedInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;