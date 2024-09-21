const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { action, rentMode, servicesProperty } = require("../utils/data");

const propertySchema = new Schema({
    address: {
        name: String,
        neighborhood: String,
        longitude: Number,
        latitude: Number,
    },
    price: Number,
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
    images: [{
        type: String,
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
});

const Property = mongoose.model("Properties", propertySchema);

module.exports = Property;