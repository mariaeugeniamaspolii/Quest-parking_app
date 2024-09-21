const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { dimensions } = require("../utils/data"); 


const vehicleSchema = new Schema({

    alias: String,
    color: String,
    model: String,
    brand: String,
    plate: String,
    dimensions: {
        type: String,
        enum: dimensions,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
});

const Vehicle = mongoose.model("Vehicles", vehicleSchema);

module.exports = Vehicle;