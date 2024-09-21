const db = require("../models");
const User = db.user;

const checkEmailExistence = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required.",
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).json({
                message: "Email already exists.",
            });
        }

        return res.status(404).json({
            message: "Email does not exist.",
        });
    } catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = {
    checkEmailExistence,
};
