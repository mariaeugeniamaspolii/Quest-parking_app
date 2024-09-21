const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { action, rentMode, servicesProperty } = require("../utils/data");

const searchSchema = new Schema({
    filters: {
        address: {
            name: String,
            neighborhood: String,
            longitude: Number,
            latitude: Number,
            distance: Number,
        },
        minPrice: Number,
        maxPrice: Number,
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
        },
        action: {
            type: String,
            enum: action,
        },
        rentMode: {
            type: String,
            enum: rentMode,
        },
        services: [{
            type: String,
            enum: servicesProperty,
        }],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
});

const Search = mongoose.model("Searches", searchSchema);

module.exports = Search;