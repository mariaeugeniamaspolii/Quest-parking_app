const express = require("express");
const router = express.Router();

const {
    findMeteredparkings,
    findMeteredparkingById,
    createMeteredparking,
    updateMeteredparking,
    deleteMeteredparking,
} = require("../controllers/meteredparking");

// Find all meteredparkings
router.get("/", async (req, res) => {
    try {
        const meteredparkings = await findMeteredparkings(req.query);
        res.json({ meteredparkings });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find meteredparking by id
router.get("/:id", async (req, res) => {
    try {
        const meteredparking = await findMeteredparkingById(req.params.id);
        res.json({
            meteredparking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create meteredparking
router.post("/", async (req, res) => {
    try {
        const newMeteredparking = await createMeteredparking(req.body);
        res.json({
            meteredparking: newMeteredparking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Update meteredparking
router.put("/:id", async (req, res) => {
    try {
        const updatedMeteredparking = await updateMeteredparking(req.params.id, req.body);
        res.json({
            meteredparking: updatedMeteredparking
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Delete meteredparking
router.delete("/:id", async (req, res) => {
    try {
        const deletedInfo = await deleteMeteredparking(req.params.id);
        res.json(deletedInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;