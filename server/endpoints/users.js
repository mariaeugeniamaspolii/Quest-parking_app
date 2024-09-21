const express = require("express");
const router = express.Router();

const {
    findUsers,
    findUserById,
    getUserName,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

// Find all users
router.get("/", async (req, res) => {
    try {
        const users = await findUsers(req.query);
        res.json({
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find user by id
router.get("/:id", async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        res.json({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Find user name by id
router.get("/:id/name", async (req, res) => {
    try {
        const userName = await getUserName(req.params.id);
        const response = userName !== null
            ? { name: userName }
            : { error: 'User not found' };

        res.status(userName !== null ? 200 : 404).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error al obtener el nombre del usuario'
        });
    }
});

// Create user
router.post("/", async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.json({
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.json({
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const deletedInfo = await deleteUser(req.params.id);
        res.json(deletedInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});

module.exports = router;