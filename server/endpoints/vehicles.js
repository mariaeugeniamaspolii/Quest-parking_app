const express = require("express");
const router = express.Router();

const {
    findVehicles,
    findVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle,
} = require("../controllers/vehicle");

// Find all vehicles
router.get("/", async (req, res) => {
    try {
        const vehicles = await findVehicles(req.query);
        res.json({ vehicles });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find vehicle by id
router.get("/:id", async (req, res) => {
    try {
        const vehicle = await findVehicleById(req.params.id);
        res.json({
            vehicle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create vehicle
router.post("/", async (req, res) => {
    try {
        const newVehicle = await createVehicle(req.body);
        res.json({
            vehicle: newVehicle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Update vehicle
router.put("/:id", async (req, res) => {
    try {
        const updatedVehicle = await updateVehicle(req.params.id, req.body);
        res.json({
            vehicle: updatedVehicle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Delete vehicle
router.delete("/:id", async (req, res) => {
    try {
        const deletedInfo = await deleteVehicle(req.params.id);
        res.json(deletedInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;