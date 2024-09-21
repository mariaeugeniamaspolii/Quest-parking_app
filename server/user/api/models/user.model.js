const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { subscription } = require("../../../utils/data");

const UserSchema = new mongoose.Schema({
  name: String,
  // username: { type: String, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // token: String,
  additionalInfo: {
    rank: Number,
    avatar: String,
    subscription: {
      type: String,
      enum: subscription,
    },
    messages: [{
      type: String,
    }],
    paymentType: [{
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
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;