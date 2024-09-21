const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { subscription } = require("../utils/data");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    rank: Number,
    avatar: String,
    subscription: {
        type: String,
        enum: subscription,
    },
    messages: [{
        type: String,
    }],
    paymentMethod: [{ 
        type: String,
    }], // Stripe
    properties: [{
        type: Schema.Types.ObjectId,
        ref: "Properties",
    }],
    parkings: [{
        type: Schema.Types.ObjectId,
        ref: "Parkings",
    }],
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: "Vehicles",
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Parkings",
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Bookings",
    }],
    meteredparking: [{ 
        type: Schema.Types.ObjectId,
        ref: "Meteredparkings",
    }],
    searches: [{
        type: Schema.Types.ObjectId,
        ref: "Searches",
    }],
}, {
    timestamps: true,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;