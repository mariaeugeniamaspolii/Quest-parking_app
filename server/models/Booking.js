const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { state } = require("../utils/data"); 

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    parking: {
        type: Schema.Types.ObjectId,
        ref: "Parkings",
    },
    schedule: {
        start: String,
        end: String,
    },
    cost: Number,
    state: {
        type: String,
        enum: state,
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: "Services",
    }],
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicles",
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model("Bookings", bookingSchema);

module.exports = Booking;