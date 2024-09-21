const express = require("express");
const router = express.Router();

const {
    findProperties,
    findPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
} = require("../controllers/property");

// Find all properties
router.get("/", async (req, res) => {
    try {
        const properties = await findProperties(req.query);
        res.json({ properties });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find property by id
router.get("/:id", async (req, res) => {
    try {
        const property = await findPropertyById(req.params.id);
        res.json({
            property
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create property
router.post("/", async (req, res) => {
    try {
        const newProperty = await createProperty(req.body);
        res.json({
            property: newProperty
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Update property
router.put("/:id", async (req, res) => {
    try {
        const updatedProperty = await updateProperty(req.params.id, req.body);
        res.json({
            property: updatedProperty
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Delete property
router.delete("/:id", async (req, res) => {
    try {
        const deletedInfo = await deleteProperty(req.params.id);
        res.json(deletedInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;