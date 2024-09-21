const express = require("express");
const router = express.Router();

const {
    findServices,
    createService,
} = require("../controllers/service");

// Find all services
router.get("/", async (req, res) => {
    try {
        const services = await findServices();
        res.json({
            services
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create service
router.post("/", async (req, res) => {
    try {
        const newService = await createService(req.body);
        res.json({
            service: newService
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;