const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meteredparkingchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    address: {
        name: String,
        neighborhood: String,
        longitude: Number,
        latitude: Number,
    },
    schedule: {
        start: Number,
        end: Number,
    },
    cost: Number,
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicles",
    },
}, {
    timestamps: true,
});

const Meteredparking = mongoose.model("Meteredparkings", meteredparkingchema);

module.exports = Meteredparking;