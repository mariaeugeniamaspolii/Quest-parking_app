const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String
}, {
    timestamps: true,
});

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;