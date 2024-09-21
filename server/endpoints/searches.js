const express = require("express");
const router = express.Router();

const {
    findSearches,
    findSearchById,
    createSearch,
    updateSearch,
    deleteSearch,
} = require("../controllers/search");

// Find all searches
router.get("/", async (req, res) => {
    try {
        const searches = await findSearches(req.query);
        res.json({
            searches
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find search by id
router.get("/:id", async (req, res) => {
    try {
        const search = await findSearchById(req.params.id);
        res.json({
            search
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Create search
router.post("/", async (req, res) => {
    try {
        const newSearch = await createSearch(req.body);
        res.json({
            search: newSearch
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Update search
router.put("/:id", async (req, res) => {
    try {
        const updatedSearch = await updateSearch(req.params.id, req.body);
        res.json({
            search: updatedSearch
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Delete search
router.delete("/:id", async (req, res) => {
    try {
        const deletedInfo = await deleteSearch(req.params.id);
        res.json(deletedInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;