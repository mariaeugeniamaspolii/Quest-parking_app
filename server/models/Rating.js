const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Bookings",
    },
    rate: Number,
    text: String,
}, {
    timestamps: true,
});

const Rating = mongoose.model("Ratings", ratingSchema);

module.exports = Rating;