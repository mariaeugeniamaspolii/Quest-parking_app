const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
    name: String,
    address: {
        name: String,
        neighborhood: String,
        longitude: Number,
        latitude: Number,
    },
    hourPrice: Number,
    dayPrice: Number,
    monthPrice: Number,
    rating: Number,
    services: [{
        type: Schema.Types.ObjectId,
        ref: "Services",
    }],
    images: [{
        type: String,
    }],
    avatar: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: "Ratings",
    }],
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
    },
    // hours: {
    //     monday: {
    //         opening: Date,
    //         closing: Date,
    //     },
    //     tuesday: {
    //         opening: Date,
    //         closing: Date,
    //     },
    //     wednesday: {
    //         opening: Date,
    //         closing: Date,
    //     },
    //     thursday: {
    //         opening: Date,
    //         closing: Date,
    //     },
    //     friday: {
    //         opening: Date,
    //         closing: Date,
    //     },
    //     saturday: {
    //         opening: Date,
    //         closing: Date,
    //     },
    //     sunday: {
    //         opening: Date,
    //         closing: Date,
    //     }
    // },
    slots: Number,
    bookings: {
        type: Schema.Types.ObjectId,
        ref: "Bookings",
    },

}, {
    timestamps: true,
});

const Parking = mongoose.model("Parkings", parkingSchema);

module.exports = Parking;