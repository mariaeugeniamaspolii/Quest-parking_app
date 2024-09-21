const Meteredparking = require("../models/Meteredparking");

const populateFields = [
    {path: "user"},
    {path: "vehicle"},
];

const buildMeteredparkingParams = (params) => ({
    user: params.user,
    address: {
        name: params.address.name,
        neighborhood: params.address.neighborhood,
        longitude: params.address.longitude,
        latitude: params.address.latitude,
    },
    schedule: {
        start: params.schedule.start,
        end: params.schedule.end,
    },
    cost: params.cost,
    vehicle: params.vehicle,
});

// Find all meteredparkings
const findMeteredparkings = async (params) => {

    const query = {
        user: params.user ? params.user : { $exists: true },
        neighborhood: params.address.neighborhood ? { $regex: new RegExp(params.address.neighborhood, 'i') } : { $exists: true },
        vehicle: params.vehicle ? params.vehicle : { $exists: true },
    }

    const meteredparkings = await Meteredparking.find(query)
        .populate(populateFields)
        .exec();

    return meteredparkings;
};

// Find meteredparking by id
const findMeteredparkingById = async (meteredparkingId) => {
    const meteredparking = await Meteredparking.findById(meteredparkingId)
        .populate(populateFields)
        .exec();

    return meteredparking;
};

// Create meteredparking
const createMeteredparking = async (params) => {
    const newMeteredparking = new Meteredparking(buildMeteredparkingParams(params));
    await newMeteredparking.save();
    return newMeteredparking;
};


module.exports = {
    findMeteredparkings,
    findMeteredparkingById,
    createMeteredparking,
};